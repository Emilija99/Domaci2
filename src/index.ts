import { KuvanjeKafeModel } from "./KuvanjeKafeModel";
import { Zasladjenost } from "./KuvanjeKafeModel";
import { KuvanjeKafeView } from "./KuvanjeKafeView";
import 'jquery/src/jquery';


import 'bootstrap/dist/css/bootstrap.css'


 //const kafa=new KuvanjeKafeModel(2,Zasladjenost.Slatka,"mleko");
 


 const skuvaj=new KuvanjeKafeView();
 skuvaj.crtaj(document.body);