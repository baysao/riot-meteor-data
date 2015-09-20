## RiotMeteorData

This mixin is a convenient way to use data from a Meteor reactive data source in a Riot component, with automatic updates when the data changes.

[Demo](http://simple-todos-riot-meteor-data.meteor.com/)

[Code](https://github.com/baysao/simple-todos-riot-meteor-data.git)

##Usage

In common code add this 

```
Riot.mixin('RiotMeteorData', RiotMeteorData);
```

In riot component add mixin set reactive data in 

```
this.getMeteorData = function(){
  // preprare data here
  return {
  // object auto computation for reactive
  }
}
```

and add mixin right after this

```
this.mixin('RiotMeteorData');
```

this mixin run computation and update data in this.data property of component context.

For example:

```
<todo>
  <h3>{ opts.title }</h3>
  <ul>
    <li each={ data.books }>
      <label>
           { author }
           { name }
      </label>

    </li>
  </ul>
  <script>
    this.getMeteorData = function() {
      return {
        books: Books.find().fetch()
      };
    }
    this.mixin('RiotMeteorData');
  </script>
</todo>
```
