## RiotMeteorData

This mixin is a convenient way to use data from a Meteor riotive data source in a Riot component, with automatic updates when the data changes.

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
