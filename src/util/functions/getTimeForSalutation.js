export function Salutation(){
    var data = new Date();
    var hours = data.getHours();
    var min = data.getMinutes();
    var hour = `${hours}:${min}`;
    if(hour >= '05:00' && hour <= '12:00'){
        return "Bom dia";
    }else if(hour >= '13:00' && hour <= '18:00'){
        return "Boa tarde";
    }else if(hour >= '18:00' && hour <= '23:59'){
        return "Boa noite";
    }else {
        return "Olá"
    }
}
