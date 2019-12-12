import claim from '../claim'

class messages{
    static getMessages(){
        return claim.get('Mensajes','getmessages');
    }
    static sendMessage(params){
        return claim.post('Mensajes', 'sendmessages', params, claim.config.JSON, claim.encode.raw);
    }
}

export default messages