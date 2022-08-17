const listTheme = document.querySelector(".listTheme");
const blocSaisi = document.querySelector(".blocSaisi");
const section = document.querySelector("section");
const ul = document.querySelector("ul");
const reset = document.querySelector(".reset");
const score = document.querySelector(".score");
const stages = document.querySelector(".stage");
const container = document.querySelector("#container");
const boutonTheme = document.querySelector(".theme");

let nombreCoeur = 4;
let firstCounter = 1;
let resultat = 0;
let data, index, hideTheme;
let arrayIndex = [];





// Noms des differents themes

const theme = ["Animaux", "Fruits", "Pays"];

theme.map(item => listTheme.innerHTML += "<div class=themes><p>" + item + "</p></div>");

/* les donnees des differents themes */ 

const dataTheme = {
    animaux : ["lion", "tortue", "pangolin", "atelopus", "Tapir", "ligre", "fennec", "canard", "souris", "hibou","baleine",
                "alouette", "poule", "boeuf", "cafard", "vache", "mouton", "chevre", "porc", "cheval", "belier", "crocodile"
                ],

    fruits : ["orange", "mangue", "abricot", "ananas", "citron", "pamplemousse", "kaki", "kiwi", "grenade", "papaye", 
"mandarine", "noisette", "banane", "avocat", "cassis", "cerise", "fraise", "framboise", "melon", "mirabelle", "noix"
                ],
    pays : ["cameroun", "islande", "togo", "gabon", "albanie", "perou", "espagne", "gambie", "afghanistan", "cuba",
            "allemagne", "andorre", "bhoutan", "chypre", "danemark", "erythree", "fidji", "honduras", "jordanie"
            ]
};

// boucle permettant d'ajouter des attributs onclick

for (let i = 0; i < listTheme.children.length; i++) { 

    listTheme.children[i].setAttribute("onclick", "myFunction(" + i + ")");
    listTheme.children[i].classList.remove("themes");
    listTheme.children[i].classList.add(`themes${i}`);

}


// construction des scores

const scores = [{
    1: 50,
    2: 35,
    3: 25,
    4: 10
}]

// blocs de lettresS

const letter = ["A","B","C","D","E","F","G","H","I","J",
"K","L","M","N","O","P","Q","R","S","T","U","V",
"W","X","Y","Z"];


letter.map(item => section.innerHTML += "<div class=boiteLettre><p>"+item+"</p></div>");

// function onclick pour les 26 lettres permettant de ressortir la lettre au clavier et les espaces
section.children[letter.indexOf("V")].classList.add("V");

for (let i = 0; i < letter.length; i++) {
    section.children[i].setAttribute("onclick", `letterOnclick(${i})`);

}



// function permettant de classer les themes par categories



function myFunction (item) {
    
    let bloc = document.querySelector(`.themes${item}`); // selection d'un bloc de themes
    bloc.style.transition = "transform 1s ease-in-out";

    // suppression du button theme

    boutonTheme.setAttribute("hidden", "");

    /* la fonction disabledOnclick permet de retirer l'evennement onclick aux autres blocs de themes*/

    if (item == 0) {

        /* creation d'un nouvel attribut perso  */
        bloc.setAttribute("newAttribute", ""); 

        themes(dataTheme.animaux);

        bloc.style.transform = "translate(30%,-15%) scale(1.5)";

        disabledOnclick(item);

        for (let i = 1; i < 2; i++){

            disabledOnclick(i);
            animationBlocThemes(i, 108, 100); // annimation permet d'annimer les blocs themes
        }
        for (let i = 2; i < 3; i++){

            disabledOnclick(i);
            animationBlocThemes(i, 1, -100);
        }

    }else if (item == 1) {

        /* creation d'un nouvel attribut perso  */
        bloc.setAttribute("newAttribute", ""); 

        themes(dataTheme.fruits);

        bloc.style.transform = "translate(-78%,-15%) scale(1.5)";

        disabledOnclick(item);

        for (let i = 0; i < 1; i++){

            disabledOnclick(i);
            animationBlocThemes(i, 214, 100);
        }
        for (let i = 2; i < 3; i++){

            disabledOnclick(i);
            animationBlocThemes(i, 1, -100);
        }
    }else {

        /* creation d'un nouvel attribut perso  */
        bloc.setAttribute("newAttribute", ""); 

        themes(dataTheme.pays);

        bloc.style.transform = "translate(-185%,-15%) scale(1.5)";

        disabledOnclick(item);
     
         for (let i = 0; i < 1; i++){
            
             disabledOnclick(i);
             animationBlocThemes(i, 214, 100);
             
         }
         for (let i = 1; i < 2; i++){
            
             disabledOnclick(i);
             animationBlocThemes(i, 108, -100);
         }
    }

    // ajout des stages
    firstCounter == 1 ? stages.innerText = "STAGE-1" :
    firstCounter == 4 ? stages.innerText = "STAGE-2" :
    firstCounter == 9 ? stages.innerText = "STAGE-3" : null
    
    
}

// function permettant d'afficher les elements d'un theme choisi

function themes (item) {

    
    setTimeout(

        function () {
            
            const randomNumber = Math.floor(Math.random() * item.length);
            data = item[randomNumber].toUpperCase();
            hideTheme = data.split("").map(item => item.replace(item, "*") ).join("");
            blocSaisi.innerHTML = "<p>" + hideTheme + "</p>";
            console.log(data);
            
        }, 900);
      
        
}



// function permettant d'animer les themes pays fruits et animaux

function animationBlocThemes(i,translateX, translateY){
    
   const themes = document.querySelector(`.themes${i}`);
   themes.style.transform = `translate(${translateX}%,${translateY}%)`;
   themes.style.transition = "transform 1s ease-in-out";

  for (let i = 0; i < letter.length; i++) {

    section.children[i].setAttribute("onclick", `letterOnclick(${i})`);
    
    }
    

}

// function permettant de retirer l'attribut onclick aux themes

function disabledOnclick (item) {

    document.querySelector(`.themes${item}`).removeAttribute("onclick");

}


// function permettant d'entrer les lettres au tableaux de saisi

    function letterOnclick(item) {

        section.children[item].style.transform = "scale(0.8)";
        section.children[item].style.transition = "transform ease-in-out 50ms";
  
        setTimeout(() => {
            section.children[item].style.transform = "scale(1)";
        }, 70);
                              
              if (data.includes(letter[item])) {
                                
                    section.children[item].style.background = "rgb(104, 216, 155)";
             
                    // permet de convertir un objet en tableau

                    hideTheme = Object.values(hideTheme); 

                    index = data.indexOf(letter[item]);

                    // permet de recuperer l'index d'un mot qui se repète

                    while (index != -1) {

                    arrayIndex.push(index);
                    index = data.indexOf(letter[item], index + 1);
                     }
                                
                    arrayIndex.map(i => hideTheme.splice(i, 1, letter[item]))
                    console.log(typeof hideTheme);
                    blocSaisi.innerText = hideTheme.join("");

                    // parametre du score

                        if (nombreCoeur == 4) {
                          resultat += scores.map(item => item[1]).reduce(item => item);
                          score.innerText = `Score: ${resultat}`;
                        }
                        else if (nombreCoeur == 3) {
                            resultat += scores.map(item => item[2]).reduce(item => item);
                            score.innerText = `Score: ${resultat}`;
                        }
                        else if (nombreCoeur == 2) {
                            resultat += scores.map(item => item[3]).reduce(item => item);
                            score.innerText = `Score: ${resultat}`;
                        }
                        else
                        {
                            resultat += scores.map(item => item[4]).reduce(item => item);
                            score.innerText = `Score: ${resultat}`;

                        }       
                            
                }

               else {
                    
                 section.children[item].style.background = "red";
                 ul.children[nombreCoeur].setAttribute("hidden", "");

                 nombreCoeur--;
                                    
                 }

           arrayIndex = [];
              

            if (data == blocSaisi.innerText) {
               
                firstCounter++;

                if (firstCounter < 4){
                    alert("Next word");
                    stage();
                } else if(firstCounter > 4 && firstCounter < 9) {
                    alert("Next word");
                    stage();
                }
                else if (firstCounter > 9 && firstCounter < 16) {
                    alert("Next word");
                    stage();
                }

                else {
                    for (let i = 0; i < letter.length; i++) {
                       section.children[i].removeAttribute("onclick"); 
                    }
                }

                if (firstCounter == 4 && data == blocSaisi.innerText) {
                    // boite de dialogue you win
                    removeNewAttribute();
                }
                       
                else if (firstCounter == 9 && data == blocSaisi.innerText) {
                    // boite de dialogue you win
                    removeNewAttribute();
                } else if(firstCounter == 16 && data == blocSaisi.innerText) {
                    // boite de dialogue you win
                    removeNewAttribute();
                }      
                 
                changeBackgroundLetter();
                nombreCoeur = 4;
                [1,2,3,4].map(item => ul.children[item].removeAttribute("hidden"));
       
            }
            else if (nombreCoeur == 0) {
                // boite de dialogue you loss
                boiteDialogue("./images/gamee.jpg");
                changeBackgroundLetter();
                for (let i = 0; i < letter.length; i++) {
                    section.children[i].removeAttribute("onclick");   
                }
                blocSaisi.innerText = data;

                /* permet de retirer l'attribut onclick sur les themes  */
                [0,1,2].map(item => disabledOnclick(item));
            }
            console.log(nombreCoeur);

  } 

  // bouton reset permettant de renitialiser le game
  reset.setAttribute("onclick", "myReset()");

  function myReset () {
      
      // ajout du bouton theme
      setTimeout(()=>{

          boutonTheme.removeAttribute("hidden");
      },1000);

      // renitialisation de la vie
      nombreCoeur = 4;
      [1,2,3,4].map(item => ul.children[item].removeAttribute("hidden"));

      // renitialisation du score
      resultat = 0;
      
      score.innerText = `Score: 0${resultat}`;
      stages.innerText = `STAGE-00`;

      // renitialisation bloc de saisi
      blocSaisi.innerText = "";
      
      // renitialisation 26 lettres

      for(let i = 0; i < letter.length; i++) {
          section.children[i].style.background = "white";
          section.children[i].removeAttribute("onclick");
          
      }

      // function permettant d'attribuer le background color white sur les 26 lettres
      changeBackgroundLetter();

      // renitialisation par defaut des positions des themes
        [0,1,2].map(item => {
            document.querySelector(`.themes${item}`).style.transform = "scale(1)";
            document.querySelector(`.themes${item}`).style.background = "blue";
            document.querySelector(`.themes${item}`).style.boxShadow = "3px 3px  3px #00b1ffff";
            document.querySelector(`.themes${item}`).setAttribute("onclick", `myFunction(${item})`);

        });
    
      // renitialisation de stage à 1
      firstCounter = 1;
    }
 
 // function permettant d'attribuer le background color white sur les 26 lettres
  function changeBackgroundLetter () {

    for (let i = 0; i < letter.length; i++) {
        section.children[i].style.background = "white";
    }
  }

  function boiteDialogue (item) {
      /* creation de la boite de dialogue personalisée */
      const containerWinner = document.createElement("div");
      containerWinner.classList.add("containerWinner");

      const blocWinner = document.createElement("div");
      
      const croosCercle = document.createElement("span");

      const image = document.createElement("img");
      image.setAttribute("src", item);
      image.setAttribute("alt", "you win!!!");
      blocWinner.appendChild(image);

      const img = document.createElement("img");
      img.setAttribute("src", "./images/annuler.png");
      img.setAttribute("alt", "annuler");
      croosCercle.appendChild(img);

      croosCercle.classList.add("crosCercle");

      blocWinner.classList.add("blocYouWin");

      containerWinner.appendChild(blocWinner);
      container.appendChild(containerWinner);

      blocWinner.appendChild(croosCercle);

      reset.removeAttribute("onclick");
      
      croosCercle.onclick = () =>{
        blocWinner.setAttribute("hidden", "");
        reset.setAttribute("onclick", "myReset()");
        [0,1,2].map(item => {
            if (!document.querySelector(`.themes${item}`).hasAttribute("newAttribute")) {
                nombreCoeur > 0 && nombreCoeur < 5 ?
                document.querySelector(`.themes${item}`).setAttribute("onclick", `myFunction(${item})`):
                document.querySelector(`.themes${item}`).removeAttribute("onclick")

                // animations de la disponibilité des boites
                
                
            }
            if (document.querySelector(`.themes${item}`).hasAttribute("newAttribute")) {
                document.querySelector(`.themes${item}`).removeAttribute("newAttribute");
                //suppression animations de la disponibilité des boites
                
            }
        });
      }
         
  }

  //gere les differents stages
  function stage () {

    if (document.querySelector(".themes0").hasAttribute("newAttribute")) {

        themes(dataTheme.animaux);

    } else if(document.querySelector(".themes1").hasAttribute("newAttribute")) {

        themes(dataTheme.fruits)

    } else {

        themes(dataTheme.pays);
    }
  }

  // ajoute couleur verte au bouton  de validation des themes finis

  function validationCouleur () {

    if (document.querySelector(".themes0").hasAttribute("newAttribute")) {
        document.querySelector(".themes0").style.boxShadow = "3px 3px 3px green";
        document.querySelector(".themes0").style.background = "#00ff7fff";
        

    } else if(document.querySelector(".themes1").hasAttribute("newAttribute")) {
        document.querySelector(".themes1").style.boxShadow = "3px 3px 3px green";
        document.querySelector(".themes1").style.background = "#00ff7fff";
        

    } else {
        document.querySelector(".themes2").style.boxShadow = "3px 3px 3px green";
        document.querySelector(".themes2").style.background = "#00ff7fff";
    }
}

// function permettant d'ajouter validation de couleurs  remove onlick and add newAttribute

function removeNewAttribute () {

    boiteDialogue("./images/you.jpg");
    validationCouleur();
    
   
}

