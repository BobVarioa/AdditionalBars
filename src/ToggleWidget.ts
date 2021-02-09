import SkullyCore from "skullycore"

export default class ToggleWidget extends SkullyCore.TopBarMenuWidget {
    public choicesFunction: () => Game.SelectorSwitchChoice[];
    public choicesPick: (id: any)=>void;
    public name: string;

    constructor(id: string, name: string, icon: Game.Icon, choicesFunction: () => Game.SelectorSwitchChoice[], choicesPick: (id: any)=>void) {
        super(id, icon);
        this.name = name;
        this.choicesFunction = choicesFunction;
        this.choicesPick = choicesPick;
        // Definitely not a janky way to do this at all 
        this.onclick = new Function(`// The following is a moddified version of Ortiel's code btw
        let me = window.SkullyCore.BarWidgets.TopBar.Bars[${this.index}]
        Game.choiceSelectorOn=-1;
        let choices=me.choicesFunction();
        let str = "";
        if (choices.length>0)
        {
            const closeStr = "l('toggleBox').style.display='none';l('toggleBox').innerHTML='';Game.choiceSelectorOn=-1;PlaySound('snd/tick.mp3');"
            let selected = 0;
            choices.forEach((value) => {
                if (value.selected) selected=value;
            })
            Game.choiceSelectorChoices=choices;//this is a really dumb way of doing this i am so sorry
            Game.choiceSelectorSelected=selected;
            
            str=\`<div class="close" onclick="l('toggleBox').style.display='none';\${closeStr}">x</div>
            <h3>\${me.name}</h3>
            <div class="line"></div>
            <h4 id="choiceSelectedName">\${choices[selected].name}</h4>
            <div class="line"></div>\`.replace("\\n", "")

            choices.forEach((value, index) => {
                choices[index].id=index;
                choices[index].order=value.order||0;
            })

            choices.sort((a, b) => {
                if (a.order>b.order) return 1;
                else if (a.order<b.order) return -1;
                else return 0;
            });

            for (let i=0;i<choices.length;i++)
            {
                if (!choices[i]) continue;
                var id=choices[i].id;
                if (choices[i].div) str+='<div class="line"></div>';
                str+=\`<div 
                class="crate enabled\${id==selected?' highlighted':''}" 
                style="opacity:1;float:none;display:inline-block;\${window.SkullyCore.IconToStyle(choices[i].icon)}}" 
                onclick="window.SkullyCore.BarWidgets.TopBar.Bars[\${me.index}].choicesPick(\${id});\${closeStr}" 
                onMouseOut="l('choiceSelectedName').innerHTML=Game.choiceSelectorChoices[Game.choiceSelectorSelected].name;" 
                onMouseOver="l('choiceSelectedName').innerHTML=Game.choiceSelectorChoices[\${i}].name;">
                </div>\`;
            }
        }
        let toggleBox = l('toggleBox')
        toggleBox.innerHTML=str;
        toggleBox.style.display='block';
        toggleBox.focus();
        Game.tooltip.hide();
        PlaySound('snd/tick.mp3');`) as () => void;
    }
}