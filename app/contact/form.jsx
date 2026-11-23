"use client";
import {useEffect,useState} from "react";
import {services,whatsapp} from "../project";
export default function Brief(){
 const [service,setService]=useState("");
 useEffect(()=>{const requested=new URLSearchParams(location.search).get("service");if(services.some(s=>s.name===requested))setService(requested);},[]);
 function send(event){event.preventDefault();const data=new FormData(event.currentTarget);location.assign(whatsapp(`Hi Vriddhi, I’m interested in ${service.toLowerCase()} in Prayagraj. ${String(data.get("brief")).trim()}`.trim()));}
 return <form onSubmit={send} className="brief"><h2>Tell us about <em>your space.</em></h2><label>Service<select required value={service} onChange={e=>setService(e.target.value)}><option value="">Choose a service</option>{services.map(s=><option key={s.name}>{s.name}</option>)}</select></label><label>Project details <small>(optional)</small><textarea name="brief" rows="4" maxLength="900" placeholder="Room, location and what you have in mind"/></label><button type="submit">Continue on WhatsApp ↗︎</button><p>Review your message in WhatsApp before sending.</p></form>;
}
