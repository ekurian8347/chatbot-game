const GameState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    FLAT:  Symbol("flat"),
    WAIT: Symbol("wait"),
    MANSION: Symbol("mansion"),
    BUTLER: Symbol("butler"),
    TOAST: Symbol("toast"),
    MUSIC: Symbol("music"),
    ASK: Symbol("ask"),
    TOW_TRUCK: Symbol("tow_truck"),
    DANCE_TYPE: Symbol("dance_type"),
    STAIR: Symbol("stair"),
    TERRACE: Symbol("terrace")
});

const choice = [ "yes", "no" ];

module.exports = class Game{
    constructor(){
        this.stateCur = GameState.WELCOMING;
    }
    
    makeAMove(sInput)
    {
        let sReply = "";
        switch(this.stateCur){
            case GameState.WELCOMING:
                sReply = "It is a dark and rainy night. Bang! You have a flat tire. Too bad you don't have a spare. Do you WAIT or GO to the spooky mansion for help ?";
                this.stateCur = GameState.FLAT;
                break;
            case GameState.FLAT:
                if(sInput.toLowerCase().match("wait")){
                    sReply = "The road is deserted. After 1 hour there is still no help. Do you WAIT or do you GO to the house ?";
                }else if(sInput.toLowerCase().match("go")){
                    sReply ="On the door is a large knocker. Do you KNOCK or RUN back to your car to wait ?";
                    this.stateCur = GameState.MANSION;
                }
                else
                {
                    sReply ="Please enter a valid command";
                }
                break;
            case GameState.MANSION:
                if(sInput.toLowerCase().match("knock")){
                    sReply = "The door opens and you are greeted by a hunch-back butler. He asks you to come in. Do you GO in or RUN back to the car ?"
                    this.stateCur = GameState.BUTLER;
                }else if(sInput.toLowerCase().match("run")){
                    sReply = "The road is deserted. After 1 hour there is still no help. Do you WAIT or do you GO to the house ?";
                    this.stateCur = GameState.FLAT;

                }
                else
                {
                    sReply ="Please enter a valid command";
                }
                break;
            case GameState.BUTLER:
                if(sInput.toLowerCase().match("run")){
                    sReply = "The road is deserted. After 1 hour there is still no help. Do you WAIT or do you GO to the house ?";
                    this.stateCur = GameState.FLAT;

                }else if(sInput.toLowerCase().match("go")){
                    sReply = "You seem to have walked in to a party. The host offers you some toast. Do you take the TOAST or ask to CALL a tow truck ?";
                    this.stateCur = GameState.TOAST;
    
                }
                else
                {
                    sReply ="Please enter a valid command";
                }
                break;
            case GameState.TOAST:
                if(sInput.toLowerCase().match("toast")){
                    sReply = "You hear music on the dance floor, What do you want to do : DANCE or WAIT or CALL ?";
                    this.stateCur = GameState.MUSIC;
                }else if(sInput.toLowerCase().match("call")){
                    if(Math.floor(Math.random() * 2) == 0){
                        sReply = "The phone lines are down ... Would you like some TOAST or want to CALL again ?";
                    }
                    else{
                        sReply = "The tow truck agent has picked up the phone, but he is not available now. Do you want to CALL a different number or Would you like some TOAST perhaps ?";
                    }
                }
                else if(sInput.toLowerCase().match("continue")){
                    sReply = "What do want to do, continue DANCE or CALL ?";
                    this.stateCur = GameState.CONTINUE;
                }
                else 
                {
                    sReply ="Please enter a valid command";
                }
                break;
            case GameState.MUSIC:
                if(sInput.toLowerCase().match("dance")){
                    sReply = "You see a nice girl dacing in the floor, Do you want to ASK for her hand or NOT ?";
                    this.stateCur = GameState.ASK;
                }else if(sInput.toLowerCase().match("wait")){
                    sReply = "Now it's your favourite song playing, Would you like to : DANCE or WAIT or CALL ?";
                }
                else if(sInput.toLowerCase().match("call")){
                    if(Math.floor(Math.random() * 2) == 0){
                        sReply = "The phone lines are down ... What would you like to do : DANCE or CALL again or WAIT ?";
                    }
                    else{
                        sReply = "The tow truck agent has picked up the phone, he will reach soon. Do you want to STAY or GO back to car ?";
                        this.stateCur = GameState.TOW_TRUCK;
                    }               
                }
                else if(sInput.toLowerCase().match("continue")){
                    sReply = "What do want to do : CONTINUE dance or CALL again ?";
                }
                else
                {
                    sReply ="Please enter a valid command";
                }
                break;
            case GameState.TOW_TRUCK:
                if(sInput.toLowerCase().match("stay")){
                    sReply = "You see a staircase going to the terrace. What do you want to do : CLIMB or STAY near the phone or go to DANCE ? ";
                    this.stateCur = GameState.STAIR;
                }
                else if(sInput.toLowerCase().match("go")){
                    sReply = "It's really dark and rainy outside. What do you want to do : go BACK or WAIT inside the car ?";
                }
                else if(sInput.toLowerCase().match("wait")){
                    sReply = "Tow truck comes and helps you fix your Tire. Game Over ";
                }
                else if(sInput.toLowerCase().match("back"))
                {
                    sReply = "What do you want to do : STAY beside the phone or go to DANCE ? ";
                    this.stateCur = GameState.STAIR;
                }
                else{
                    sReply ="Please enter a valid command"; 
                }
                break;
            case GameState.STAIR:
                if(sInput.toLowerCase().match("climb")){
                    sReply = "You see beautiful stars in the sky. What do you want to do : WATCH the sky or GO downstairs ?";
                    this.stateCur = GameState.TERRACE;
                }
                else if(sInput.toLowerCase().match("stay")){
                    sReply = "Do you want to STAY or GO back to car ?";
                    this.stateCur = GameState.TOW_TRUCK;
                }
                if(sInput.toLowerCase().match("dance")){
                    sReply = "What do want to do : CONTINUE dance or CALL again ?";
                    this.stateCur = GameState.MUSIC;
                }
                break;
            case GameState.TERRACE:
                if(sInput.toLowerCase().match("go"))
                {
                    sReply = "What do you want to do : STAY beside the phone or go to DANCE ? ";
                    this.stateCur = GameState.STAIR;
                }
                else if(sInput.toLowerCase().match("watch"))
                {
                    sReply = "You see the tow truck. What do you want to do : WATCH the sky or go to your CAR ?";
                }
                else if(sInput.toLowerCase().match("car"))
                {
                    sReply = "Tow truck helps you fix your Tire. Game Over ";
                }
                else
                {
                    sReply ="Please enter a valid command";
                }
                break;
            case GameState.ASK:
                if(sInput.toLowerCase().match("ask")){
                    var her_choice = choice[ Math.floor(Math.random() * choice.length)];
                    sReply = "She says "+ her_choice;
                    if(her_choice == "yes")
                    {
                        sReply += " Which type of dance would you like to play : BALLET or JAZZ ?";
                        this.stateCur = GameState.DANCE_TYPE;
                    }
                    else{
                        sReply += ". Do you want to CONTINUE dance or CALL ?";
                        this.stateCur = GameState.MUSIC;
                    }
                    
                }
                else if(sInput.toLowerCase().match("not")){
                    sReply = "Do you want to CONTINUE dance or CALL ?";
                    this.stateCur = GameState.MUSIC;
                }
                else{
                    sReply ="Please enter a valid command";
                }
                break;
            case GameState.DANCE_TYPE:
                if(sInput.toLowerCase().match("ballet")){
                    sReply = "Do you want to CONTINUE dance or CALL ?";
                    this.stateCur = GameState.MUSIC;
                }
                else if(sInput.toLowerCase().match("jazz")){
                    sReply = "Do you want to CONTINUE dance or CALL ?";
                    this.stateCur = GameState.MUSIC;
                }
                else{
                    sReply ="Please enter a valid command";
                }
                break;

        }
        return([sReply]);
    }
}