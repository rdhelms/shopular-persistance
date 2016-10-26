angular.module('shopular').factory('Item', function() {
  var tax = ( 5.75 / 100 );
  return function Item(props) {
    props = props || {};
    this.id = props.id || Date.now();
    this.name = props.name || '';
    this.price = props.price || 0;
    this.quantity = props.quantity || 0;
    this.color = props.color || '';
    this.discount = props.discount || 0;
    this.totalPrice = (props.price * (1 + tax) - props.discount) || 0;
    this.editing = false;
  };
});
