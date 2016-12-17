var rolConstructorTop = {

    run: function(creep, numConstructores) {
        
        var contenedorX = parseInt(Memory.datos.contenedorX);
        var contenedorY = parseInt(Memory.datos.contenedorY);
        var extensionX = parseInt(Memory.datos.extensionX);
        var extensionY = parseInt(Memory.datos.extensionY);

        if(creep.memory.construir && creep.carry.energy == 0) { // Creep en Modo Construcción / Sin energía
            creep.memory.construir = false; // Pasar a Modo Recolección para obtener más energía
            creep.say('Recolectar');
        }
        if(!creep.memory.construir && creep.carry.energy == creep.carryCapacity) { // Creep en Modo Recolección / Full energía
            creep.memory.construir = true; // Pasar a Modo Construcción para comenzar a construir
            creep.say('Construir');
        }
        if(creep.memory.construir) { // Creep en Modo Construcción / Con energía
        
            // Empezar a constuir la Extensión
            var punto = Game.rooms.sim.getPositionAt(extensionX,extensionY);
            var extension = punto.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(extension) {
                if(creep.build(contenedor) == ERR_NOT_IN_RANGE){ // Desplazarse hasta el punto si no está en el rango
                    creep.moveTo(contenedor);
                }
            }
            else{ // Si la Extensión ya está construida, trabajar en el Contenedor
                var punto = Game.rooms.sim.getPositionAt(contenedorX,contenedorY);
                var contenedor = punto.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(contenedor) {
                    if(creep.build(contenedor) == ERR_NOT_IN_RANGE){ // Desplazarse hasta el punto si no está en el rango
                        creep.moveTo(contenedor);
                    }
                }
            }
        }
        else { // Modo Recolección 
            var punto = Game.rooms.sim.getPositionAt(43,44);
            var fuente = punto.findClosestByRange(FIND_SOURCES_ACTIVE);
            // Si no está en el rango de la fuente, desplazarse hasta ella
            if(creep.harvest(fuente) == ERR_NOT_IN_RANGE) {
                creep.moveTo(fuente);
            }      
        }
    }
};

module.exports = rolConstructorTop;
