var rolRecolector = {
    // Recoger energía para el Spawn (si tiene capacidad)
    run: function(creep) {
        
        // FUNCIÓN RECARGADOR (si el Controlador aún no es level 2)
        if(Game.spawns.Central.room.controller.level < 2){
            
            if(creep.memory.transferir && creep.carry.energy == 0) { // Creep en Modo Transferir / Sin energía
                creep.memory.transferir = false; // Pasar a Modo Recolección para obtener más energía
                //creep.say('Recolectar');
            }
            if(!creep.memory.transferir && creep.carry.energy == creep.carryCapacity) { // Creep en Modo Recolección / Full energía
                creep.memory.transferir = true; // Pasar a Modo Transferir para llevar energía a un contenedor
                //creep.say('Transferir');
            }
            if(creep.memory.transferir) { // Creep en Modo Transferir / Con energía

    			// Entregará la energía al Controlador si está en el rango
    			if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    				// Si no es así, se desplazará primero hasta él
    				creep.moveTo(creep.room.controller);
    			}
            }
            else { // Modo Recolección 
                var sources = creep.room.find(FIND_SOURCES); // Localizar fuente y obtener energía
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) { // Desplazarse hasta la fuente si no está cerca
                    creep.moveTo(sources[0]);
                }
    		}            
        }
        // FUNCIÓN RECOLECTOR (si ya subió el Controlador a level 2)
        else{
            
            // Si el recolector lleva menos energía de la que puede transportar, intenta obtener más
            if(creep.carry.energy < creep.carryCapacity) {
                
                switch(numRecolectores){
                  
                    case 0: case 1:
                        var recursos = creep.room.find(FIND_SOURCES);
                        // Si no está en el rango de una fuente, desplazarse hasta una una
                        if(creep.harvest(recursos[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(recursos[0]);
                        }
                        break;
                        
                    default:
                        var punto = Game.rooms.sim.getPositionAt(35,2);
                        var fuente = punto.findClosestByRange(FIND_SOURCES_ACTIVE);
                        // Si no está en el rango de la fuente, desplazarse hasta ella
                        if(creep.harvest(fuente) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(fuente);
                        }                    
                        break;
                }
            }
            // Si el recolector está lleno y el Spawn Central tiene aún capacidad, dirigirse hasta él y transferirla
            else if(Game.spawns['Central'].energy < Game.spawns['Central'].energyCapacity) {
                
                if(creep.transfer(Game.spawns['Central'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns['Central']);
                }
            }
        }
    }
};

module.exports = rolRecolector;
