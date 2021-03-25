import { KuvanjeKafeModel, Prilog } from "./KuvanjeKafeModel";
import { Zasladjenost } from "./KuvanjeKafeModel";

import "./stil.css";



export class KuvanjeKafeView
{
    private kontejner:HTMLElement;

    crtaj(host:HTMLElement)
    {
        this.kontejner=document.createElement("div");
        host.appendChild(this.kontejner);
        this.crtajFormu();
        this.crtajPrikaz();
        this.kontejner.classList.add("row","kontejner");

    }

    crtajFormu()
    {
        const divForma=document.createElement("div");
        this.kontejner.appendChild(divForma);

        const naslov=document.createElement("h2");
        naslov.innerHTML="Skuvaj kafu";
        divForma.appendChild(naslov);
        divForma.classList.add("col-5","forma");

      


        const tipovi=["input","select","select"];
        const labele=["Broj kafa: ","Zasladjenost:","Prilog:"];
        const opcijeZasl=["Gorka","Slatka","Srednja"];
        const opcijePrilozi=["Mleko","Slag","Cokolada","Bez"];


        tipovi.forEach((el,indeks)=>{
            const miniKont=document.createElement("div");
            divForma.appendChild(miniKont);
            divForma.classList.add("form-group");

            const lbl=document.createElement("label");
            lbl.innerHTML=labele[indeks];
            miniKont.appendChild(lbl);

            const unos=document.createElement(el);
            miniKont.appendChild(unos);
            unos.classList.add("form-control");


            if(el==="select")
            {
                let niz:string[];
                if(labele[indeks]=="Zasladjenost:")
                {
                   niz=opcijeZasl;
                   unos.classList.add("zasladjenost");
                }
                else
                { niz=opcijePrilozi;
                  unos.classList.add("prilozi");
                }

                niz.forEach(opcija=>{
                    const novaOpcija=document.createElement("option");
                    unos.appendChild(novaOpcija);
                    novaOpcija.innerHTML=opcija;
                })

            }
            else{
                (unos as HTMLInputElement).type="number";
                
            }
          
            
        })

        const divDugme=document.createElement("div");
        divForma.appendChild(divDugme);
        const dugme=document.createElement("button");
        dugme.innerHTML="Skuvaj kafu";
        divDugme.appendChild(dugme);
       
       dugme.className="dugmence";
       dugme.classList.add("btn-block");

        dugme.onclick=ev=>{

            const broj=this.kontejner.querySelector("input").value;
            if(broj==="")
            {
                alert("Morate uneti broj kafa!");
                return;
            }

            if(parseInt(broj)<=0)
            {
                alert("Broj kafa mora biti veci ili jednak nuli!");
                return;
            }

          
            const zasl=(this.kontejner.querySelector(".zasladjenost") as HTMLInputElement).value;
            const prilog=(this.kontejner.querySelector(".prilozi") as HTMLInputElement).value;
            const crtanje=this.kontejner.querySelector(".prikaz");

            


            const kafa=new KuvanjeKafeModel(parseInt(broj),KuvanjeKafeModel.StringUEnumZasl(zasl),KuvanjeKafeModel.StringUEnumPrilog(prilog));
            crtanje.innerHTML="";
           kafa.SkuvajKafu(crtanje,"innerHTML");
            
           


            


        }




    }


   


  async  crtajPrikaz()
    {
        const divPrikaz=document.createElement("textarea");
        divPrikaz.rows=5;
        divPrikaz.cols=40;
       // divPrikaz.disabled=true;
       divPrikaz.readOnly=true;


        divPrikaz.className="prikaz";
        this.kontejner.appendChild(divPrikaz);
   
    }
    
}