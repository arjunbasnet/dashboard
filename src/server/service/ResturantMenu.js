const axios = require('axios')
const RESTURANTS = {
    "a-bloc":{
        name: "A Bloc",
        id: "3087",
        company: "fazer"
    },
    "alvari":{
        name: "Alvari Amica",
        id: "0190",
        company: "fazer"
    },
    "tietokoniikantalo":{
        name: "Computer Science Building",
        id: "142",
        company: "sodexo"
    },
    "arvo":{
        name: "Arvo",
        id: "39106",
        company: "sodexo"
    }
}

const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
}
  
class ResturantMenu {
    constructor(name){
        this.name = name
        this.menus = []
        this.init()
    }

    init(){
        if(RESTURANTS[this.name]){
            this.resturant = RESTURANTS[this.name];
        }
    }

    async getMenus(){
        if(!this.resturant){
            throw `Resturant ${this.name} not listed`
        }

        return await this.fetchMenu(this.resturant)
    }

    async fetchMenu(resturant){
        if(resturant.company === "sodexo"){
            let response = await this.makeSodexRequest(resturant)
            this.handleSodexoResponse(response)
        }

        if(resturant.company === "fazer"){
            let response = await this.makeFazerRequest(resturant)
            this.handleFazerRsponse(response)
        }

        return this.menus
    }

    async makeSodexRequest(resturant){
        const feedUrl = "https://www.sodexo.fi/ruokalistat/output/daily_json"
        
        const today = new Date()    
        let year = today.getFullYear()
        
        let month = today.getMonth() + 1
        if(month < 10){
            month = "0" + month
        }
        
        let day = today.getDate()
        if(day < 10){
            day = "0" + day
        }

        const response = await axios.get(feedUrl+"/"+resturant.id+"/"+year+"/"+month+"/"+day+"/en")
        return response
    }

    handleSodexoResponse(response){
        const courses = response.data.courses
        this.menus = courses.map((menu,indx)=>{
            let menuItem = {
                id: indx,
                name: menu.category
            }

            if(menu.price){
                let prices = menu.price.split('/')
                menuItem.price = prices.reduce((price,p)=>{
                    p = p.trim()
                    if(!price){
                        price = p
                    }else{
                        price += '/'+ p
                    }
                    return price
                },'')                
            }else{
                menuItem.price = '5,60/2,60'
            }

            menuItem.components = [menu.title_en]
            if(menu.properties){
                menuItem.components.push(menu.properties)
            }

            return menuItem
        })
    }

    async makeFazerRequest(resturant){
        let feedUrl = "https://www.fazerfoodco.fi/modules/json/json/Index?language=en"
        
        try{
            const response = await axios.get(feedUrl+'&costNumber='+resturant.id)
            return response
        }catch(error){
            throw new Error("could not fetch menu for resturant "+ this.name);
        }        
    }

    handleFazerRsponse(response){
        const daysMenu = response.data.MenusForDays
        let todayMenus = [];

        for (let i = 0; i < daysMenu.length; i++) {
            const dayMenu = daysMenu[i];
            const menuDate = new Date(dayMenu.Date)
            if(isToday(menuDate)){
                todayMenus = dayMenu.SetMenus
                break;
            }
        }

        this.menus = todayMenus.map((menu,indx)=>{
            let menuItem = {
                id: indx,
                name: menu.Name,
                price: menu.Price,
                components: menu.Components                
            }

            // set default name if no name
            if(!menuItem.name){
                menuItem.name = "Lunch"
            }

            // set default price if not
            if(menuItem.price){
                menuItem.price = menuItem.price.match(/\d+(,\d+)/g).join('/')
            }else{
                menuItem.price = "7,90/5,60/2,60"
            }
            return menuItem
        })
    }
}

module.exports = ResturantMenu