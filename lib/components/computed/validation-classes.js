module.exports = function() {

    return {
      'VF-Field--required':this.rules.required,
      'has-error':this.errors.length,
      'has-feedback':this.hasFeedback,
      'has-success':this.success
    }
  }
