RiotMeteorData = {
  init() {
    this.data = {};
    this._meteorDataManager = new MeteorDataManager(this);
    const newData = this._meteorDataManager.calculateData();
    this._meteorDataManager.updateData(newData);
    this.on('update', function() {
      // calculateData();
      const newData = this._meteorDataManager.calculateData();
      this._meteorDataManager.updateData(newData);
    })
    this.on('unmount', function() {
       this._meteorDataManager.dispose();
    })
  }
};

// A class to keep the state and utility methods needed to manage
// the Meteor data for a component.
class MeteorDataManager {
  constructor(component) {
     // console.log('constructor');
    this.component = component;
    this.computation = null;
    this.oldData = null;
  }

  dispose() {
      // console.log('dispose');
    if (this.computation) {
      this.computation.stop();
      this.computation = null;
    }
  }

  calculateData() {
     // console.log('calculateData');
    const component = this.component;
    // const {props, state} = component;

    if (! component.getMeteorData) {
      // console.log('not define getMeteorData');
      return null;
    }

    // When rendering on the server, we don't want to use the Tracker.
    // We only do the first rendering on the server so we can get the data right away
    if (Meteor.isServer) {
      return component.getMeteorData();
    }

    if (this.computation) {
      this.computation.stop();
      this.computation = null;
    }

    let data;
    // Use Tracker.nonreactive in case we are inside a Tracker Computation.
    // This can happen if someone calls `React.render` inside a Computation.
    // In that case, we want to opt out of the normal behavior of nested
    // Computations, where if the outer one is invalidated or stopped,
    // it stops the inner one.
    this.computation = Tracker.nonreactive(() => {
      return Tracker.autorun((c) => {
        if (c.firstRun) {
            data = component.getMeteorData();
            // console.log(data);
        } else {
          // Stop this computation instead of using the re-run.
          // We use a brand-new autorun for each call to getMeteorData
          // to capture dependencies on any reactive data sources that
          // are accessed.  The reason we can't use a single autorun
          // for the lifetime of the component is that Tracker only
          // re-runs autoruns at flush time, while we need to be able to
          // re-call getMeteorData synchronously whenever we want, e.g.
          // from componentWillUpdate.
          c.stop();
          // Calling forceUpdate() triggers componentWillUpdate which
          // recalculates getMeteorData() and re-renders the component.
          // component.forceUpdate();
          component.update();
        }
      });
    });
    
    if (Package.mongo && Package.mongo.Mongo) {
      Object.keys(data).forEach(function (key) {
        if (data[key] instanceof Package.mongo.Mongo.Cursor) {
          console.warn(
  "Warning: you are returning a Mongo cursor from getMeteorData. This value " +
  "will not be reactive. You probably want to call `.fetch()` on the cursor " +
  "before returning it.");
        }
      });
    }

    return data;
  }

  updateData(newData) {
    // console.log('updateData');
    const component = this.component;
    const oldData = this.oldData;

    if (! (newData && (typeof newData) === 'object')) {
      throw new Error("Expected object returned from getMeteorData");
    }
    // update componentData in place based on newData
    for (let key in newData) {
      component.data[key] = newData[key];
    }
    // if there is oldData (which is every time this method is called
    // except the first), delete keys in newData that aren't in
    // oldData.  don't interfere with other keys, in case we are
    // co-existing with something else that writes to a component's
    // this.data.
    if (oldData) {
      for (let key in oldData) {
        if (!(key in newData)) {
          delete component.data[key];
        }
      }
    }
    this.oldData = newData;
  }
}
