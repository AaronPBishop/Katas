/* 
In this kata, we want to convert a URL query string into a nested object. The query string will contain parameters that may or may not have embedded dots ('.'), and these dots will be used to break up the properties into the nested object.

You will receive a string input that looks something like this:

user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue

Your method should return an object hash-map that looks like this:

{
  'user': {
    'name': {
      'firstname': 'Bob',
      'lastname': 'Smith'
    },
    'favoritecolor': 'Light Blue'
  }
}

You can expect valid input. You won't see input like:

* This will NOT happen *
foo=1&foo.bar=2

All properties and values will be strings — and the values should be left as strings to pass the tests.
Make sure you decode the URI components correctly
*/

const convertQueryToMap = (query) => {
    if (!query.length) return {};
    
    const obj = {};
    query.split('&').forEach(param => {
      const [key, value] = param.split('=');
      const keys = key.split('.');

      let nestedObj = obj;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = decodeURIComponent(keys[i]);
        nestedObj[k] = nestedObj[k] || {};
        nestedObj = nestedObj[k];
      };

      const k = decodeURIComponent(keys[keys.length - 1]);
      nestedObj[k] = decodeURIComponent(value);
    });

    return obj;
};