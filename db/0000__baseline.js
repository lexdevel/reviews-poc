db = db.getSiblingDB('reviews-poc-db');

db.createCollection('categories');
db.createCollection('products');
db.createCollection('reviews');
db.createCollection('stock');
db.createCollection('tags');
db.createCollection('users');

const ids = {
  categories: {
    beer: new ObjectId()
  },
  products: {
    duff: new ObjectId()
  },
  reviews: {},
  stock: {},
  tags: {
    alcohol: new ObjectId(),
    beer: new ObjectId()
  },
  users: {
    hsimpson: new ObjectId(),
    pgriffin: new ObjectId()
  }
};

db.getCollection('categories').insertMany([
  {
    _id: ids.categories.beer,
    name: 'Beer'
  }
]);

db.getCollection('products').insertMany([
  {
    _id: ids.products.duff,
    title: 'Duff',
    price: 10.0,
    categoryId: ids.categories.beer,
    tagIds: [
      ids.tags.alcohol,
      ids.tags.beer
    ]
  }
]);

db.getCollection('reviews').insertMany([
  {
    _id: new ObjectId(),
    commentary: 'The best beer in the world!',
    userId: ids.users.hsimpson,
    productId: ids.products.duff
  },
  {
    _id: new ObjectId(),
    commentary: 'Donkey urine :/',
    userId: ids.users.pgriffin,
    productId: ids.products.duff
  }
]);

db.getCollection('stock').insertMany([
  {
    _id: new ObjectId(),
    productId: ids.products.duff,
    count: 42
  }
]);

db.getCollection('tags').insertMany([
  {
    _id: ids.tags.alcohol,
    name: 'Alcohol'
  },
  {
    _id: ids.tags.beer,
    name: 'Beer'
  }
]);

db.getCollection('users').insertMany([
  {
    _id: ids.users.hsimpson,
    username: 'hsimpson',
    fullname: 'Homer Simpson'
  },
  {
    _id: ids.users.pgriffin,
    username: 'pgriffin',
    fullname: 'Peter Griffin'
  }
]);