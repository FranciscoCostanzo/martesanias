import{j as r}from"./jsx-runtime.CLpGMVip.js";import{r as o}from"./index.Bt0A1Q69.js";/* empty css                      */const b=()=>{const[p,l]=o.useState([]),[t,i]=o.useState({nombre:"",precio:"",categoria_id:"",imagen:null}),d=[{span:"Nombre",type:"text",name:"nombre"},{span:"Precio",type:"number",name:"precio"},{span:"Imagen",type:"file",name:"imagen"}];o.useEffect(()=>{fetch("https://insutec.shop/phpmar/categorias.php").then(e=>e.json()).then(e=>{e.success&&l(e.data)})},[]);const c=e=>{const{name:a,value:s,files:n}=e.target;i(u=>({...u,[a]:n?n[0]:s}))},m=async e=>{e.preventDefault();const a=new FormData;a.append("nombre",t.nombre),a.append("precio",t.precio),a.append("categoria_id",t.categoria_id),a.append("imagen",t.imagen);try{const n=await(await fetch("https://insutec.shop/phpmar/upload.php",{method:"POST",body:a})).json();console.log("Respuesta del servidor:",n),n.success?(alert("Producto subido con éxito"),i({nombre:"",precio:"",categoria_id:"",imagen:null})):alert("Error al subir: "+n.error)}catch(s){console.error("Error en el fetch:",s),alert("Error de red o servidor.")}};return r.jsxs("div",{className:"formulario-wrapper",children:[r.jsx("h2",{children:"Agregar Pulsera"}),r.jsxs("form",{onSubmit:m,encType:"multipart/form-data",children:[d.map((e,a)=>r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("span",{children:e.span}),r.jsx("input",{type:e.type,name:e.name,onChange:c,...e.type!=="file"?{value:t[e.name]}:{},required:!0})]})},a)),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("span",{children:"Categoría"}),r.jsxs("select",{name:"categoria_id",value:t.categoria_id,onChange:c,required:!0,children:[r.jsx("option",{value:"",children:"Seleccionar categoría"}),p.map(e=>r.jsx("option",{value:e.id,children:e.nombre},e.id))]})]})}),r.jsx("button",{type:"submit",children:"Subir"})]})]})};export{b as default};
