import { useEffect, useState } from 'react'
import DepthCarousel from './DepthCarousel'
import './AimvShowcase.css'
import './AimvTab.css'

const works=[
 {title:'金色舞台',video:'/assets/media/aimv/golden-stage.mp4',image:'/assets/media/aimv/golden-stage.jpg'},
 {title:'周杰伦 MV',video:'/assets/media/aimv/jay-chou-mv.mp4',image:'/assets/media/aimv/jay-chou-mv.jpg'},
 {title:'怪诞毕业照',video:'/assets/media/aimv/graduation-photo.mp4',image:'/assets/media/aimv/graduation-photo.jpg'},
 {title:'氛围发丝',video:'/assets/media/aimv/hair-atmosphere.mp4',image:'/assets/media/aimv/hair-atmosphere.jpg'},
 {title:'雨夜唱片店',video:'/assets/media/aimv/rainy-record-store.mp4',image:'/assets/media/aimv/rainy-record-store.jpg'},
 {title:'列车月台',video:'/assets/media/aimv/train-platform.mp4',image:'/assets/media/aimv/train-platform.jpg'},
 {title:'新加坡打卡',video:'/assets/media/aimv/singapore-checkin.mp4',image:'/assets/media/aimv/singapore-checkin.jpg'},
 {title:'开学季',video:'/assets/media/aimv/back-to-school.mp4',image:'/assets/media/aimv/back-to-school.jpg'}
]

export default function AimvTab(){
 const[active,setActive]=useState(0)
 const[playing,setPlaying]=useState(null)
 const current=works[active]
 useEffect(()=>{document.body.style.overflow=playing?'hidden':'';return()=>{document.body.style.overflow=''}},[playing])
 return <div className="aimv-embedded" key="aimv">
  <div className="aimv-carousel-wrap"><DepthCarousel items={works.map(work=>({image:work.image,alt:work.title}))} cardWidth={270} cardHeight={480} radius={8} depth={180} spread={78} tilt={18} perspective={1450} visibleCards={4} falloff={.18} blur={4} loop showControls showIndicators onChange={setActive}/></div>
  <div className="aimv-copy">
   <p className="section-kicker">MODULE 06 · AI MUSIC VIDEO</p>
   <p className="aimv-index">{String(active+1).padStart(2,'0')} / {String(works.length).padStart(2,'0')}</p>
   <h3>{current.title}</h3>
   <p>AIMV模板作品</p>
   <button type="button" onClick={()=>setPlaying(current)}>播放作品 <span>▶</span></button>
   <div className="aimv-list">{works.map((work,index)=><button type="button" className={index===active?'is-active':''} key={work.title} onClick={()=>setActive(index)}><i>{String(index+1).padStart(2,'0')}</i>{work.title}</button>)}</div>
  </div>
  {playing&&<div className="aimv-player" role="dialog" aria-modal="true" aria-label={playing.title} onClick={()=>setPlaying(null)}><button className="aimv-close" type="button" onClick={()=>setPlaying(null)}>关闭 ×</button><div onClick={event=>event.stopPropagation()}><video src={playing.video} poster={playing.image} controls autoPlay playsInline preload="none"/></div></div>}
 </div>
}
