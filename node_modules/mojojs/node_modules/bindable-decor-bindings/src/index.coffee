disposable = require "disposable"

class BindingsDecorator

  ###
  ###

  constructor: (@target, options) ->
    @bindings = if typeof options is "object" then options else undefined
    @_disposable = disposable.create()
    @target.once "dispose", @dispose

  ###
  ###

  bind: () =>
    @_setupExplicitBindings() if @bindings

  ###
  ###

  dispose: () =>
    @_disposable.dispose()


  ###
   explicit bindings are properties from & to properties of the view controller
  ###

  _setupExplicitBindings: () ->
    bindings = @bindings
    @_setupBinding key, bindings[key] for key of bindings

  ###
  ###
  _setupBinding: (property, to) ->


    options = {}

    if typeof to is "function" 
      oldTo = to
      to = () =>
        oldTo.apply @target, arguments

    if to.to
      options = to
    else
      options = { to: to }

    @_disposable.add @target.bind(property, options).now()


module.exports = (event) ->
  priority: "load"
  getOptions: (target) -> target.bindings
  decorate: (target, options) ->
    decor = new BindingsDecorator target, options

    # event? wait for it.
    if event
      target.once event, decor.bind

    # otherwise, bind immediately
    else
      decor.bind()
