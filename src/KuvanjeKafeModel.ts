export enum Zasladjenost
{
    Gorka=0,
    Srednja,
    Slatka
}

export enum Prilog{
    Bez,
    Mleko,
    Slag,
    Cokolada
}





export class KuvanjeKafeModel
{

  
    private brojKafa:number;
    private zasladjenost:Zasladjenost;
    private prilog:Prilog;

    constructor(br:number,zasl:Zasladjenost,prilog:Prilog)
    {
        this.brojKafa=br;
        this.zasladjenost=zasl;
       this. prilog=prilog;
    }


    async  ZagrejVodu():Promise<string>{
        return new Promise<string>((resolve,reject)=>{
            setTimeout(()=>{
                resolve("Prokljucala voda!\n");

            },this.brojKafa*2000);
        })
    }
   

    async  DodajSecer():Promise<string>{
        return new Promise<string>((resolve,reject)=>{
            setTimeout(()=>{
                if(this.zasladjenost===Zasladjenost.Gorka)
                   resolve("Bez secera!\n");
                resolve("Stavljen secer!\n");

            },this.zasladjenost*this.brojKafa*1000);
        })
    }

    
    async  StaviKafu():Promise<string>{
        return new Promise<string>((resolve,reject)=>{
            setTimeout(()=>{
                resolve("Stavljena kafa!\n");

            },this.brojKafa*1000);
        })
    }


    async  DodajPrilog():Promise<string>{
        let coef:number;
        if(this.prilog===Prilog.Bez)
           coef=0;
        else coef=1;
        return new Promise<string>((resolve,reject)=>{
            setTimeout(()=>{
                resolve(`Dodat prilog: ${KuvanjeKafeModel.PrilogUString(this.prilog)}\n`);

            },1500*this.brojKafa*coef);
        })
    }


//poruke se ispisuju u property 'svojstvo' objekta 'objekat'
   async SkuvajKafu<T,K extends keyof T>(objekat:T,svojstvo:K)//prvo se ceka da prokljuca voda, zatim se ceka da se dodaju kafa i secer(nebitno u kom redosledu) i na kraju se dodaje prilog
    {
       
       objekat[svojstvo]=await this.ZagrejVodu() as unknown as T[K];
    

      let niz=  await Promise.all(
            [this.StaviKafu(),this.DodajSecer()]
        );

        niz.forEach(el=>{
            objekat[svojstvo]=(objekat[svojstvo]as unknown as string).concat(el) as unknown as T[K];
        })

        objekat[svojstvo]=(objekat[svojstvo]as unknown as string).concat(await this.DodajPrilog()) as unknown as T[K];
        
        objekat[svojstvo]=(objekat[svojstvo]as unknown as string).concat("Kafe su spremne!") as unknown as T[K];
  
 

 
    }

    static PrilogUString(p:Prilog):string{
        if(p===Prilog.Bez)
          return "Bez";
        if(p===Prilog.Cokolada)
          return "Cokolada";
        if(p===Prilog.Mleko)
          return "Mleko";
        return "Slag";
    }

   static StringUEnumZasl(s:string):Zasladjenost
    {
        if(s==="Gorka")
           return Zasladjenost.Gorka;
         if(s==="Srednja")
        return Zasladjenost.Srednja;
         return Zasladjenost.Slatka;
    }

  static  StringUEnumPrilog(s:string):Prilog
    {
        if(s==="Bez")
          return Prilog.Bez;
        if(s==="Mleko")
          return Prilog.Mleko;
        if(s==="Cokolada")
          return Prilog.Cokolada;
        return Prilog.Slag;
        
    }

    
}