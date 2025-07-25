import{a as N,u as d,j as a,am as R,y as F}from"./main-DHGA4RMi.js";import{B as S}from"./button-DeS5fEeF.js";import{F as A,a as B}from"./formik.esm-BercYKuP.js";import{a as D}from"./grades-selector-unGdizhG.js";import{S as o}from"./select-field-DU_85CZz.js";import{C as s}from"./content-field-BGUkCFTc.js";import{a as T}from"./users-selector-BJBZJU_2.js";import{T as c}from"./text-field-DJsT8N_6.js";import{a as U}from"./professions-selector-CZgXADeW.js";import"./preload-helper-DPi8upcZ.js";import"./icons-BU7Eetv7.js";import"./cleanable-DLcL7uGm.js";import"./use-dropdown-CyAQJHyt.js";import"./index.browser-OxPLOBIU.js";function V({user:t,setIsOpen:p}){var h,f,x,b,j,_,g,v,$,k,w,y,C;const q=N(),i=d(D),r=d(T),u=d(U),E={grades:i==null?void 0:i.filter(l=>l.teacherId===t.id).map(({id:l})=>l),education:(h=t.teacher)==null?void 0:h.education,achievements:(f=t.teacher)==null?void 0:f.achievements,work_experience:(x=t.teacher)==null?void 0:x.workExperience,children:r==null?void 0:r.filter(({id:l})=>{var n,e;return(e=(n=t.parent)==null?void 0:n.children)==null?void 0:e.includes(l)}).map(({id:l})=>l),profession_id:(b=t.parent)==null?void 0:b.professionId,workplace:(j=t.parent)==null?void 0:j.workplace,position:(_=t.parent)==null?void 0:_.position,grade_id:(g=t.student)==null?void 0:g.gradeId,mother_id:(v=t.student)==null?void 0:v.motherId,father_id:($=t.student)==null?void 0:$.fatherId,admission_date:(k=t.student)==null?void 0:k.admissionDate,previous_schools:(w=t.student)==null?void 0:w.previousSchools,medical_recommendations:(y=t.student)==null?void 0:y.medicalRecommendations,talents:(C=t.student)==null?void 0:C.talents},I=async(l,n)=>{n.setSubmitting(!0),await q(R({id:t.id,dto:l,onSuccess:()=>{F.success("Данные успешно сохранены."),p(!1)},onValidationError:e=>n.setErrors({...e.errors}),onFail:e=>F.error(e)})),n.setSubmitting(!1)};return a.jsx(A,{initialValues:E,onSubmit:I,children:({isSubmitting:l,setFieldValue:n})=>a.jsxs(B,{className:"flex flex-col gap-3",children:[t.role==="teacher"&&a.jsxs(a.Fragment,{children:[i&&a.jsx(o,{name:"grades",label:"Руководитель класса",multiple:!0,cleanable:!0,onClean:()=>n("grades",[]),options:i.map(e=>({value:e.id,label:`${e.level} ${e.group}`}))}),a.jsx(s,{name:"education",label:"Образование"}),a.jsx(s,{name:"achievements",label:"Достижения"}),a.jsx(s,{name:"work_experience",label:"Опыт работы"})]}),t.role==="parent"&&a.jsxs(a.Fragment,{children:[r&&a.jsx(o,{name:"children",label:"Дети",multiple:!0,cleanable:!0,searchable:!0,onClean:()=>n("children",[]),options:r.filter(({role:e})=>e==="student").map(e=>({value:e.id,label:`${e.surname} ${e.name}`}))}),u&&a.jsx(o,{name:"profession_id",label:"Сфера деятельности",searchable:!0,options:u.map(({id:e,name:m})=>({value:e,label:m})),required:!0}),a.jsx(c,{name:"workplace",label:"Место работы",required:!0}),a.jsx(c,{name:"position",label:"Должность",required:!0})]}),t.role==="student"&&a.jsxs(a.Fragment,{children:[i&&a.jsx(o,{name:"grade_id",label:"Класс",cleanable:!0,onClean:()=>n("grade_id",null),options:i.map(e=>({value:e.id,label:`${e.level} ${e.group}`}))}),r&&a.jsxs(a.Fragment,{children:[a.jsx(o,{name:"mother_id",label:"Мать",cleanable:!0,searchable:!0,onClean:()=>n("mother_id",null),options:r.filter(({role:e,sex:m})=>e==="parent"&&m==="female").map(e=>({value:e.id,label:`${e.surname} ${e.name}`}))}),a.jsx(o,{name:"father_id",label:"Отец",cleanable:!0,searchable:!0,onClean:()=>n("father_id",null),options:r.filter(({role:e,sex:m})=>e==="parent"&&m==="male").map(e=>({value:e.id,label:`${e.surname} ${e.name}`}))})]}),a.jsx(c,{name:"admission_date",label:"С какого года ребенок обучается в ЧОУ «Империя знаний»",type:"date",required:!0}),a.jsx(s,{name:"previous_schools",label:"Перечислите предыдущие школы",placeholder:"Если нет — пишите «Нет»",required:!0}),a.jsx(s,{name:"medical_recommendations",label:"Медицинские и психологические рекомендации для ребенка",placeholder:"Если нет — пишите «Нет»",required:!0}),a.jsx(s,{name:"talents",label:"Таланты",placeholder:"Если нет — пишите «Нет»",required:!0})]}),a.jsxs("div",{className:"flex items-center justify-end gap-2 mt-2 sm:col-span-2",children:[a.jsx(S,{className:"justify-center min-w-[92px]",type:"submit",disabled:l,loading:l,variant:"success",children:"Сохранить"}),a.jsx(S,{type:"reset",onClick:()=>p(!1),variant:"danger",children:"Отмена"})]})]})},JSON.stringify(t[t.role]))}export{V as default};
