


class ModuleResolver extends require("./base")

  ###
  ###

  constructor: (@_name) ->
    super()
  
  ###
  ###

  resolve: () -> 
    name : @_name
    load : () => require(@_name)

  ###
  ###

  @create: (name) -> new ModuleResolver(name)

  ###
  ###

  @test: (name) -> 
    try 
      require.resolve(name)
    catch e


module.exports = ModuleResolver