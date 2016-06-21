module.exports = function(e) {

 if (this.ajax || this.client)
  e.preventDefault();

if (this.errors.length>0) {

  this.showAllErrors();
  e.preventDefault();

  this.$dispatch('vue-formular.invalid.client', this.errors);

  return false;
}

if (this.options.sendOnlyDirtyFields && this.pristine) {
  e.preventDefault();
  return false;
}

if (!(this.ajax || this.client)) return;

var data = this.formData();

if (this.ajax) {
  this.$dispatch('vue-formular.sending');

  this.serverErrors = '';
  this.status = 'info';
  this.statusbarMessage = this.options.texts.sending;

  this.$http[this.method.toLowerCase()](this.action,data).then(function(data){

    this.reinitForm();
    this.$dispatch('vue-formular.sent', data);
    this.status = 'success';

    this.statusbarMessage = typeof data.data=='string'?data.data:this.options.texts.sent;

    setTimeout(function() {
      this.statusbarMessage = '';
    }.bind(this), this.options.successTimeout);

  }.bind(this))
  .catch(function(response) {

    this.$dispatch('vue-formular.invalid.server', response);
    this.status = 'danger';

    var errors = response.data;

    if (typeof errors=='string') {
     this.statusbarMessage = errors;
     return;
   }

   if (typeof errors=='object')
     errors.forEach(function(error, i) {
      errors[i].show = true;
    });
   this.statusbarMessage= '';
   this.serverErrors = errors;

 }.bind(this));
} else if (this.client) {
  this.reinitForm();
  this.$dispatch('vue-formular.sent', data);
  this.status = 'success';
  this.statusbarMessage = this.options.texts.sent;
}

}
