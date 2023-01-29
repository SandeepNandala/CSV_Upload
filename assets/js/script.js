let searchData=document.getElementById('searh-data');
let searchCsv=document.getElementById('search-csv');
let CSVFileData=document.getElementById('search-csv').value;
console.log("CSVFileData",CSVFileData)


function search(event){
    let value = event.target.value;
    event.stopPropagation();
    if(value!=""){
      document.getElementById('searh-data').innerHTML=""
      let tableData="";
      `<table class="table">
      <thead>
      <tr>`
     for(let col of CSVFileData.slice(0,1)){
       for(let j of col){
         tableData+=`<th scope="col">${j}</th>`
       }
     }
     tableData+=`</tr>
     </thead>
     <tbody class="table-group-divider">`
     for(let i of CSVFileData.slice(1)){
       tableData+=`<tr>`
       let searchName=i[1].toLowerCase();
       if(searchName.includes(value.toLowerCase())){
       for(let j of i){
         tableData+=`<td>${j}</td>`
       }
     }
     } 
     tableData+=`</tbody>
     </table>`

     document.getElementById('searh-data').innerHTML=tableData
    }
    
  }


  // <table class="table">
  //   <thead>
  //   <tr>
  //     <% for(let col of data.slice(0,1)) {%>
  //       <% for(let j of col){%>
  //         <th scope="col">
  //           <%=j %>
  //         </th>
  //         <%}%>
  //           <%}%>
  //   </tr>
  // </thead>
  // <tbody class="table-group-divider">
  //   <% for(let i of data.slice(1)){%>
  //     <tr>
  //       <% for(let j of i){%>
  //         <td>
  //           <%=j%>
  //         </td>
  //         <%}%>
  //     </tr>
  //     <%}%>
  // </tbody>
  // </table>

  searchCsv.addEventListener('keyup',search);