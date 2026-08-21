import { useState } from 'react'
import DepthCarousel from './DepthCarousel'
import AimvTab from './AimvTab'

const modules=[
 {name:'人声音效',title:'人声音效',text:'覆盖多种演唱场景与声音风格，通过音效配置帮助用户快速找到适合自己的声音表达。',bullets:['负责音效方案配置与音效库管理','制定听评标准并验证效果一致性','推动版本验收、问题修复与上线复盘'],images:[{image:'/assets/mixer/modules/voice-effects/a9f98fec8ef299b50d5a6b4887ab1fdc.webp',alt:'人声音效界面 1'},{image:'/assets/mixer/modules/voice-effects/95d692188f26e3941c7e6290da771a66.webp',alt:'人声音效界面 2'},{image:'/assets/mixer/modules/voice-effects/7f384e366fb4f8004b6812575037293a.webp',alt:'人声音效界面 3'},{image:'/assets/mixer/modules/voice-effects/db5e49370a0ad54f4d3ea705fda7a1c2.webp',alt:'人声音效界面 4'},{image:'/assets/mixer/modules/voice-effects/30e8a508a389764ee3e1b3dc18ab7e93.webp',alt:'人声音效界面 5'}]},
 {name:'人声美化',title:'人声美化',text:'围绕人声能量、清晰度和听感饱满度，设计柔和、适中、饱和等不同增强档位。',bullets:['设计人声增强档位与适用场景','组织多轮 Demo 听评与参数调优','验证不同机型与演唱素材的稳定性'],images:[{image:'/assets/mixer/modules/beautify/a81c285954be2179d05796144b28b262.webp',alt:'人声美化界面'}]},
 {name:'人声均衡',title:'人声均衡',text:'通过均衡、音色调节与人声对齐能力，改善人声频率分布和伴奏融合效果。',bullets:['配置均衡模板与音色参数','参与人声伴奏对齐效果验收','沉淀听感问题与验收标准'],images:[{image:'/assets/mixer/modules/equalizer/85a4c229c9a21ee855cd2ea496d06d7f.webp',alt:'人声均衡界面'}]},
 {name:'人声母带',title:'人声母带',text:'面向作品整体输出，提供不同风格和空间感的母带处理方案，提升成品完整度。',bullets:['参与母带模板配置与命名包装','对比处理前后响度和融合效果','协同算法与研发推进版本交付'],images:[{image:'/assets/mixer/modules/mastering/d35c4e59fee420955665c3f851f0b814.webp',alt:'人声母带界面 1'},{image:'/assets/mixer/modules/mastering/17237228df99e38241a6d89a918942bf.webp',alt:'人声母带界面 2'}]},
 {name:'AI歌声',title:'AI歌声',text:'探索 AI 歌声在演唱辅助与内容创作中的应用，连接产品能力和用户表达场景。',bullets:['参与 AI 歌声能力体验与验收','梳理内容应用场景和用户路径','支持版本素材、配置与上线复盘'],images:[{image:'/assets/mixer/modules/ai-vocal/53fc208cef39ad17a435d961a8380a88.webp',alt:'AI歌声界面 1'},{image:'/assets/mixer/modules/ai-vocal/46935639b84a0bda65514960753777d9.webp',alt:'AI歌声界面 2'}]}
]
const allModules=[...modules,{name:'AIMV',type:'aimv'}]
export default function MixerCase(){
 const[active,setActive]=useState(0);const mod=allModules[active]
 return <section className="mixer-case"><div className="shell">
  <div className="mixer-head"><div><p className="section-kicker">PRODUCT CASE · SOUND EXPERIENCE</p><h2>K歌调音台</h2><p>从声音处理到成品输出，构建完整的 K 歌音频体验。</p></div><dl><div><dt>项目角色</dt><dd>产品运营 / 音效内容运营</dd></div><div><dt>产品类型</dt><dd>C端产品</dd></div><div><dt>项目周期</dt><dd>2023—2026</dd></div></dl></div>
  <div className="mixer-tabs">{allModules.map((item,i)=><button key={item.name} className={active===i?'active':''} onClick={()=>setActive(i)}>{item.name}</button>)}</div>
  {mod.type==='aimv'?<AimvTab/>:<div className="mixer-focus carousel-module" key={mod.name}>
   <div className="module-carousel"><DepthCarousel key={mod.name} items={mod.images} cardWidth={310} cardHeight={672} radius={10} tint="#050606" depth={155} spread={72} tilt={17} tiltDirection="right" perspective={1450} visibleCards={Math.min(4,mod.images.length)} falloff={0.17} blur={3} duration={650} autoplay={false} loop={mod.images.length>1} showControls={mod.images.length>1} showIndicators={mod.images.length>1}/></div>
   <div className="module-copy"><p className="section-kicker">MODULE 0{active+1}</p><h3>{mod.title}</h3><p>{mod.text}</p><ul>{mod.bullets.map(x=><li key={x}>{x}</li>)}</ul></div>
  </div>}
  <div className="mixer-stats"><div><b>20+</b><span>人声音效</span></div><div><b>5</b><span>音频处理模块</span></div><div><b>500+</b><span>Demo 样本</span></div><div><b>iOS / Android</b><span>双端验收</span></div></div>
  <div className="mixer-process"><span>项目流程</span><p>需求分析　→　音效设计　→　参数配置　→　Demo验证　→　双端验收　→　上线复盘</p></div>
 </div></section>
}




