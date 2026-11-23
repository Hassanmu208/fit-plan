/* Adds a preference-aware pantry and recipe templates. */
const FP_RECIPE_PANTRY = [
 {ar:'ملح',en:'Salt',k:0,p:0,c:0,f:0,src:'USDA FoodData Central; sodium is not included in current app macros.'},
 {ar:'فلفل أسود',en:'Black pepper',k:251,p:10.39,c:63.95,f:3.26,src:'USDA SR Legacy FDC 170931'},
 {ar:'كمون',en:'Cumin',k:375,p:17.81,c:44.24,f:22.27,src:'USDA SR Legacy FDC 170923'},
 {ar:'كزبرة ناشفة',en:'Dried coriander',k:298,p:12.37,c:54.99,f:17.77,src:'USDA SR Legacy FDC 170922'},
 {ar:'بابريكا',en:'Paprika',k:282,p:14.14,c:53.99,f:12.89,src:'USDA FoodData Central, spices and herbs'},
 {ar:'قرفة',en:'Cinnamon',k:247,p:3.99,c:80.59,f:1.24,src:'USDA SR Legacy FDC 171320'},
 {ar:'كركم',en:'Turmeric',k:312,p:9.68,c:67.14,f:3.25,src:'USDA SR Legacy, spices and herbs'},
 {ar:'ورق لورا',en:'Bay leaf',k:313,p:7.61,c:74.97,f:8.36,src:'USDA SR Legacy, spices and herbs'},
 {ar:'بقدونس',en:'Parsley',k:36,p:2.97,c:6.33,f:.79,src:'USDA FoodData Central FDC 170416'}
];
const fpAddCatalogItem=(a,x)=>{if(!a.some(y=>y.nameAr===x.nameAr||y.id===x.id))a.push(x)};
FP_RECIPE_PANTRY.forEach((x,i)=>{
 const common={category:'التوابل والأعشاب',subcategory:'توابل وأعشاب',nameAr:x.ar,nameEn:x.en,state:'للتتبيل',unit:'100 جم',kcal:x.k,protein:x.p,carbs:x.c,fat:x.f,source:x.src,verification:'USDA composition data per 100 g',notes:'تستخدم كميات صغيرة. الملح لا يضيف سعرات ملحوظة، والصوديوم غير محسوب ضمن الماكروز الحالية.',needsReview:false};
 fpAddCatalogItem(CATALOG,{id:'F-PANTRY-'+String(i+1).padStart(2,'0'),...common,sourceRow:'FitPlan recipe pantry'});
 fpAddCatalogItem(FC_RAW_CATALOG,{id:'raw-PANTRY-'+String(i+1).padStart(2,'0'),sourceId:'PANTRY-'+String(i+1).padStart(2,'0'),foodMode:'cook',...common,notesEn:'Use small seasoning portions. Salt has no meaningful calories; sodium is not included in current macros.',sourceRow:'FitPlan recipe pantry'});
});
FC_EN_CATEGORIES['التوابل والأعشاب']='Seasonings and herbs'; FC_EN_CATEGORIES['البيض']='Eggs'; FC_RAW_EN_CATEGORIES['التوابل والأعشاب']='Seasonings and herbs'; FC_RAW_CATEGORY_ORDER['التوابل والأعشاب']=12; FC_EN_SUBCATEGORIES['توابل وأعشاب']='Seasonings and herbs'; FC_EN_SUBCATEGORIES['البيض']='Eggs';
// Hard-boiled egg was missing from the quick catalog; raw egg remains in the cook catalog.
fpAddCatalogItem(CATALOG,{id:'F-PANTRY-EGG',category:'البيض',subcategory:'البيض',nameAr:'بيض مسلوق',nameEn:'Hard-boiled egg',state:'مسلوق',unit:'100 جم',kcal:155,protein:12.58,carbs:1.12,fat:10.61,source:'USDA FoodData Central SR Legacy FDC 173424',verification:'USDA SR Legacy per 100 g',energyCheck:'مقبول',notes:'قيمة للجزء المأكول من البيض المسلوق.',sourceRow:'FitPlan recipe pantry',needsReview:false});
const FP_RECIPE_SOURCE={foul:'https://cbcsofra.com/wa/حواوشي-فول-بالبيض/',molokhia:'https://cbcsofra.com/wa/ملوخية-6/',okra:'https://cbcsofra.com/wa/طاجن-بامية-باللحمة-الضاني-6/',fish:'https://cbcsofra.com/ls/فطار-النهارده-29-رمضان/',menu:'https://cbcsofra.com/hb/نظام-غذائي-صحي-للحوامل-من-هي-وبس/'};
const FP_RECIPE_BOOK={
 quick:{
  bf:[
   {id:'quick-foul-egg',ar:'فول وبيض مع عيش بلدي',en:'Fava beans, egg and baladi bread',pick:[/فول مدمس/,/بيض مسلوق/,/عيش بلدي|خبز بلدي/],g:[180,100,60],time:'10 دقائق',source:FP_RECIPE_SOURCE.foul,arSteps:['سخّن الفول في إناء صغير، وأضف قليلًا من الماء إذا كان كثيفًا.','قدّم البيض المسلوق مع الفول والعيش البلدي. المقادير محسوبة حسب الوزن الظاهر.'],enSteps:['Warm the fava beans in a small pan; add a little water if thick.','Serve with the boiled egg and baladi bread. Portions follow the listed weights.']},
   {id:'quick-cheese-oats',ar:'جبنة قريش بالشوفان والفاكهة',en:'Cottage cheese with oats and fruit',pick:[/جبنة قريش/,/شوفان/,/موز|تفاح/],g:[150,35,100],time:'5 دقائق',source:FP_RECIPE_SOURCE.menu,arSteps:['ضع الجبنة القريش في طبق.','أضف الشوفان والفاكهة المقطعة، وقلّبها أو قدّم المكونات بجانب بعضها.'],enSteps:['Place cottage cheese in a bowl.','Add oats and chopped fruit; mix or serve the ingredients alongside each other.']}
  ],
  ln:[
   {id:'quick-beef-okra',ar:'لحم بقري مع أرز وبامية',en:'Beef with rice and okra',pick:[/لحمة بقري قطع|لحم بقري/,/أرز أبيض|أرز بسمتي/,/بامية/],g:[150,170,150],time:'جاهزة للتقديم',source:FP_RECIPE_SOURCE.okra,arSteps:['سخّن اللحم والبامية المطهوين كلًّا على حدة حتى يصبحا ساخنين بالكامل.','قدّم اللحم والبامية بجانب الأرز. هذه تركيبة من أطعمة جاهزة وليست وصفة مكونات نيئة.'],enSteps:['Reheat the cooked beef and okra separately until hot throughout.','Serve beside the rice. This combines prepared foods rather than raw ingredients.']},
   {id:'quick-shawarma-pasta',ar:'شاورما فراخ مع مكرونة وسلطة',en:'Chicken shawarma with pasta and salad',pick:[/شاورما فراخ/,/مكرونة بالصلصة|مكرونة مسلوقة/,/سلطة خضراء|خضار سوتيه/],g:[160,170,120],time:'جاهزة للتقديم',source:FP_RECIPE_SOURCE.menu,arSteps:['سخّن الشاورما والمكرونة حتى يصبحا ساخنين بالكامل.','قدّم السلطة أو الخضار بجانبهما.'],enSteps:['Reheat the shawarma and pasta until hot throughout.','Serve with the salad or vegetables.']}
  ],
  dn:[
   {id:'quick-fish-rice',ar:'سمك مشوي مع أرز وسلطة',en:'Grilled fish with rice and salad',pick:[/سمك مشوي|فيليه سمك/,/أرز أبيض|أرز بسمتي/,/سلطة خضراء/],g:[170,140,120],time:'جاهزة للتقديم',source:FP_RECIPE_SOURCE.fish,arSteps:['سخّن السمك والأرز حتى يصبحا ساخنين بالكامل.','قدّم السلطة بجانبهما.'],enSteps:['Reheat the fish and rice until hot throughout.','Serve with salad.']},
   {id:'quick-chicken-potato',ar:'فراخ مع بطاطس وخضار',en:'Chicken with potatoes and vegetables',pick:[/صدور فراخ|شاورما فراخ|كفتة فراخ/,/بطاطس في الفرن|بطاطس مسلوقة/,/خضار سوتيه|سلطة خضراء/],g:[160,180,120],time:'جاهزة للتقديم',source:FP_RECIPE_SOURCE.menu,arSteps:['سخّن الدجاج والبطاطس حتى يصبحا ساخنين بالكامل.','قدّم الخضار إلى جانبهما.'],enSteps:['Reheat the chicken and potatoes until hot throughout.','Serve with vegetables.']}
  ],
  sn:[
   {id:'quick-yogurt-fruit',ar:'زبادي بالفاكهة',en:'Yogurt with fruit',pick:[/زبادي يوناني|زبادي لايت|زبادي عادي/,/موز|تفاح|فراولة/],g:[170,120],time:'3 دقائق',source:FP_RECIPE_SOURCE.menu,arSteps:['ضع الزبادي في طبق وأضف الفاكهة المقطعة.'],enSteps:['Spoon yogurt into a bowl and add chopped fruit.']},
   {id:'quick-cottage-fruit',ar:'جبنة قريش مع فاكهة',en:'Cottage cheese with fruit',pick:[/جبنة قريش/,/تفاح|موز|فراولة/],g:[120,100],time:'3 دقائق',source:FP_RECIPE_SOURCE.menu,arSteps:['قدّم الجبنة القريش مع الفاكهة المقطعة.'],enSteps:['Serve cottage cheese with chopped fruit.']}
  ],
  pw:[
   {id:'quick-pw-yogurt-banana',ar:'زبادي وموز بعد التمرين',en:'Yogurt and banana after training',pick:[/زبادي يوناني|زبادي لايت|زبادي عادي/,/موز/],g:[170,120],time:'3 دقائق',source:FP_RECIPE_SOURCE.menu,arSteps:['قدّم الزبادي مع الموز بعد التمرين.'],enSteps:['Serve yogurt with banana after training.']},
   {id:'quick-pw-milk-oats',ar:'لبن بالشوفان والفاكهة',en:'Milk with oats and fruit',pick:[/لبن قليل الدسم|لبن خالي الدسم|لبن كامل الدسم/,/شوفان/],g:[200,35],time:'5 دقائق',source:FP_RECIPE_SOURCE.menu,arSteps:['اخلط الشوفان مع اللبن واتركه 5 دقائق حتى يلين.'],enSteps:['Mix oats with milk and let stand for 5 minutes to soften.']}
  ]
 },
 cook:{
  bf:[
   {id:'cook-foul-egg',ar:'فول بالبيض والعيش البلدي',en:'Fava beans with egg and baladi bread',pick:[/^فول$/, /بيض كامل/,/عيش بلدي|خبز بلدي/],g:[160,100,60],sp:[['بصل',8],['طماطم',35],['كمون',1],['فلفل أسود',.3],['ملح',.4],['ثوم',2]],time:'15 دقيقة',source:FP_RECIPE_SOURCE.foul,arSteps:['اسلق البيضة 9–10 دقائق بعد بدء غليان الماء، ثم برّدها قليلًا وقشّرها.','سخّن الفول في حلة صغيرة مع ملعقة أو اثنتين من الماء. أضف فقط الخضار والتوابل الظاهرة في المكونات.','قلّب دقيقتين على نار هادئة، وقدّم الفول مع البيض والعيش البلدي.'],enSteps:['Boil the egg for 9–10 minutes after the water starts boiling; cool slightly and peel.','Warm the fava beans with 1–2 tablespoons of water. Add only the vegetables and seasonings listed in the ingredients.','Stir over low heat for 2 minutes and serve with the egg and baladi bread.']},
   {id:'cook-oats-milk',ar:'شوفان باللبن والموز',en:'Oats with milk and banana',pick:[/شوفان/,/لبن قليل الدسم|لبن خالي الدسم|لبن كامل الدسم/,/موز/],g:[50,180,90],sp:[['قرفة',.5]],time:'8 دقائق',source:FP_RECIPE_SOURCE.menu,arSteps:['ضع الشوفان واللبن في حلة صغيرة على نار هادئة.','قلّب 5–7 دقائق حتى يلين الشوفان. أضف قليلًا من اللبن إذا أصبح الخليط كثيفًا.','أطفئ النار وأضف الموز المقطع والقرفة إذا كانت ظاهرة ضمن المكونات.'],enSteps:['Add oats and milk to a small saucepan over low heat.','Stir for 5–7 minutes until soft; add a splash of milk if it gets too thick.','Turn off the heat and add sliced banana and any listed cinnamon.']}
  ],
  ln:[
   {id:'cook-beef-okra',ar:'طاجن لحم وبامية مع أرز',en:'Beef and okra stew with rice',pick:[/لحم بقري قليل الدهن|لحم بقري$/, /رز أبيض|رز بسمتي/,/بامية/],g:[150,65,180],sp:[['بصل',35],['طماطم',100],['ثوم',4],['كمون',.6],['كزبرة ناشفة',1],['فلفل أسود',.3],['ملح',.5]],time:'60–90 دقيقة',source:FP_RECIPE_SOURCE.okra,arSteps:['اغسل الأرز. اسلق اللحم في ماء يغطيه حتى يطرى، غالبًا 45–75 دقيقة حسب القطعة، وأزل الرغوة.','في حلة، ضع الخضار والتوابل المسموحة مع قليل من مرقة اللحم، ثم أضف البامية واتركها على نار هادئة 20–30 دقيقة حتى تلين.','أضف اللحم المطهو واترك الخليط 5 دقائق. اطه الأرز منفصلًا حسب العبوة وقدّمه مع الطاجن.'],enSteps:['Rinse the rice. Simmer the beef in water until tender, usually 45–75 minutes depending on the cut; skim any foam.','Put the allowed vegetables and seasonings in a pot with a little broth. Add okra and simmer 20–30 minutes until tender.','Add the cooked beef and simmer for 5 minutes. Cook rice separately as directed and serve with the stew.']},
   {id:'cook-chicken-molokhia',ar:'فراخ وملوخية مع أرز',en:'Chicken and molokhia with rice',pick:[/صدر دجاج|ورك دجاج/,/رز أبيض|رز بسمتي/,/ملوخية/],g:[160,65,180],sp:[['ثوم',4],['كزبرة ناشفة',1],['بصل',30],['فلفل أسود',.3],['ملح',.5]],time:'40–55 دقيقة',source:FP_RECIPE_SOURCE.molokhia,arSteps:['اسلق الدجاج في ماء يغطيه حتى ينضج تمامًا؛ غالبًا 25–35 دقيقة للصدر، وأطول للورك. احتفظ بكوب من المرقة.','اطه الأرز منفصلًا حسب العبوة. سخّن الملوخية مع المرقة على نار هادئة حتى تسخن، وتجنب الغليان القوي.','شوّح مكونات التتبيل الظاهرة في المكونات بمقلاة غير لاصقة مع قليل من الماء أو كمية زيت محسوبة من الكتالوج، ثم أضفها للملوخية. قدّمها مع الدجاج والأرز.'],enSteps:['Simmer chicken in water until fully cooked, usually 25–35 minutes for breast and longer for thigh. Save a cup of broth.','Cook rice as directed. Warm molokhia with broth over low heat until hot; avoid a hard boil.','Briefly toast the listed seasonings in a nonstick pan with a little water or a measured amount of catalog oil, then stir into the molokhia. Serve with chicken and rice.']}
  ],
  dn:[
   {id:'cook-tilapia-rice',ar:'سمك بلطي بالفرن مع أرز وخضار',en:'Oven-baked tilapia with rice and vegetables',pick:[/سمك بلطي|سمك فيليه/,/رز أبيض|رز بسمتي/,/خضار سوتيه|بطاطس/],g:[170,55,160],sp:[['ثوم',3],['كمون',.7],['كزبرة ناشفة',.6],['ليمون',15],['فلفل أسود',.3],['ملح',.4]],time:'35–45 دقيقة',source:FP_RECIPE_SOURCE.fish,arSteps:['سخّن الفرن إلى 200°م. جفف السمك ثم تبّله بالمكونات والتوابل المسموحة الظاهرة في المقادير.','ضعه في صينية مبطنة بورق خبز. اخبزه 12–18 دقيقة حسب السمك وسُمكه، حتى يصبح معتمًا ويتفتت بسهولة.','اطه الأرز حسب العبوة، واطه الخضار بالبخار أو في طاسة غير لاصقة. قدّمهم معًا.'],enSteps:['Heat the oven to 200°C. Pat the fish dry and season with the allowed ingredients listed.','Bake on a lined tray for 12–18 minutes depending on thickness, until opaque and flaking easily.','Cook rice as directed and steam or pan-cook the vegetables. Serve together.']},
   {id:'cook-chicken-pasta',ar:'فراخ بالصلصة مع مكرونة',en:'Chicken in tomato sauce with pasta',pick:[/صدر دجاج/,/^مكرونة$/, /طماطم|صلصة طماطم/],g:[160,65,100],sp:[['ثوم',3],['بصل',25],['بابريكا',.5],['فلفل أسود',.3],['ملح',.4]],time:'35–45 دقيقة',source:FP_RECIPE_SOURCE.menu,arSteps:['اسلق المكرونة في ماء يغلي حسب وقت العبوة ثم صفّها.','قطّع الدجاج شرائح واطهه في طاسة غير لاصقة حتى ينضج من الداخل؛ أضف قليلًا من الماء إذا بدأ يلتصق.','أضف الخضار والتوابل الظاهرة في المكونات واترك الصلصة 10–12 دقيقة حتى ينضج الدجاج تمامًا. قدّمها فوق المكرونة.'],enSteps:['Boil pasta according to the package time, then drain.','Slice the chicken and cook it in a nonstick pan until done inside; add a splash of water if it sticks.','Add the listed vegetables and seasonings. Simmer 10–12 minutes until the chicken is fully cooked, then serve over pasta.']}
  ],
  sn:[
   {id:'cook-yogurt-fruit',ar:'زبادي بالفاكهة',en:'Yogurt with fruit',pick:[/زبادي يوناني|زبادي لايت|زبادي عادي/,/موز|تفاح|فراولة/],g:[170,120],sp:[['قرفة',.3]],time:'3 دقائق',source:FP_RECIPE_SOURCE.menu,arSteps:['ضع الزبادي في طبق وأضف الفاكهة المقطعة والقرفة إذا كانت مدرجة ضمن المقادير.'],enSteps:['Spoon yogurt into a bowl and add chopped fruit and any listed cinnamon.']},
   {id:'cook-cottage-fruit',ar:'جبنة قريش مع فاكهة',en:'Cottage cheese with fruit',pick:[/جبنة قريش/,/تفاح|موز|فراولة/],g:[130,100],time:'3 دقائق',source:FP_RECIPE_SOURCE.menu,arSteps:['قدّم الجبنة القريش مع الفاكهة المقطعة.'],enSteps:['Serve cottage cheese with chopped fruit.']}
  ],
  pw:[
   {id:'cook-pw-yogurt-banana',ar:'زبادي وموز بعد التمرين',en:'Yogurt and banana after training',pick:[/زبادي يوناني|زبادي لايت|زبادي عادي/,/موز/],g:[170,120],sp:[['قرفة',.3]],time:'3 دقائق',source:FP_RECIPE_SOURCE.menu,arSteps:['قدّم الزبادي مع الموز والقرفة إذا كانت ضمن المكونات المسموحة.'],enSteps:['Serve yogurt with banana and allowed cinnamon.']},
   {id:'cook-pw-milk-oats',ar:'شوفان باللبن والفاكهة',en:'Oats with milk and fruit',pick:[/شوفان/,/لبن قليل الدسم|لبن خالي الدسم|لبن كامل الدسم/],g:[40,180],time:'8 دقائق',source:FP_RECIPE_SOURCE.menu,arSteps:['اطه الشوفان مع اللبن على نار هادئة 5–7 دقائق حتى يلين. أضف الفاكهة المتاحة إذا كانت ضمن اختياراتك.'],enSteps:['Cook oats with milk over low heat for 5–7 minutes until soft. Add available fruit if selected.']}
  ]
 }
};
const fpRecipeCandidate=(d,k,index)=>{
 const mode=(S.profile||{}).foodMode==='cook'?'cook':'quick',foods=fpPool(),book=FP_RECIPE_BOOK[mode][k]||[],cap=fpLimits(d,k),baseMeal=meal(d,k),baseKcal=(baseMeal.items||[]).reduce((n,[id,g])=>n+fpItemKcal(id,g),0),target=Math.min(cap.kcal,baseKcal||cap.kcal),out=[];
 book.forEach((r,ri)=>{
  const chosen=r.pick.map(rx=>foods.find(x=>rx.test(x.nameAr+' '+(x.nameEn||'')))); if(chosen.some(x=>!x))return;
  const core=chosen.map((x,i)=>({id:x.id,g:r.g[i]||100})),season=[];
  (r.sp||[]).forEach(([name,g])=>{const rawName={'ثوم':/^ثوم/,'بصل':/^بصل/,'طماطم':/^طماطم/,'ليمون':/^ليمون/}[name];const x=foods.find(y=>y.nameAr===name||y.nameEn===name||(rawName&&rawName.test(y.nameAr)));if(x)season.push({id:x.id,g})});
  const fixed=fpSum(season),coreMacros=fpSum(core); if(!coreMacros.kcal)return;
  let factor=Math.max(.2,(target-fixed.kcal)/coreMacros.kcal);
  const initial=core.map(x=>({...x,g:Math.max(1,Math.round(x.g*factor/5)*5)})).concat(season),total=fpSum(initial);
  out.push({recipe:r,rows:initial,total,score:Math.abs(total.kcal-target)+ri*.001});
 });
 out.sort((a,b)=>a.score-b.score);return out[index]||null;
};
const fpRecipeLegacyDraft=fpDraft;
fpDraft=(d,k,variant=0)=>fpRecipeCandidate(d,k,variant)?.rows||fpRecipeLegacyDraft(d,k,variant);
const fpRecipeMeta=(d,k,variant=0)=>{const c=fpRecipeCandidate(d,k,variant);if(!c){const rows=fpRecipeLegacyDraft(d,k,variant),fallback=rows.length&&typeof fpManualRecipeMeta==='function'?fpManualRecipeMeta(d,k,rows):null;return fallback?{...fallback,foodMode:(S.profile||{}).foodMode||'quick'}:null}const r=c.recipe,timeEn=r.time==='جاهزة للتقديم'?'Ready to serve':r.time.replace(/دقائق|دقيقة/g,'minutes');return{recipeId:r.id,nameAr:r.ar,nameEn:r.en,recipeName:r.ar,recipeNameAr:r.ar,recipeNameEn:r.en,prepAr:r.arSteps,prepEn:r.enSteps,recipeTime:S.lang==='en'?timeEn:r.time,recipeSource:r.source,foodMode:(S.profile||{}).foodMode||'quick'}};
