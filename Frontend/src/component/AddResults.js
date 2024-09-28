import React, {useState} from 'react'

function AddResults() {
  const [results, setResults] = useState({
    regNo:'',
    name:null,
    DS:'',
    CN:'',
    OS:'',
    sgpa:null,
    pass:'Pass'
  });

  const [message, setMessage] = useState([{message:""}]);

  const getName = () => {
    fetch("http://localhost:5555/getStudent/" + results.regNo,{
      method:"GET"
    }).then((res)=>res.json()).then((res)=>setResults({...results, name:res.name}));
  }

  const handleChange = (e) => {
    setResults({...results, [e.target.name]:e.target.value.toUpperCase()});
  }

  const handleSubmit = () => {
    fetch('http://localhost:5555/addResults',{
      method : "POST",
      body:JSON.stringify(results),

      headers:{
        "Content-Type":"application/json"
      }
  }).then((res)=>res.json()).then((res)=>setMessage(res))
}

  return (
    <div align="center">
      <h1 className='text-3xl p-3'>Admin - Post Results</h1>
      <marquee className='p-3 m-2 bg-yellow-200'>This portal posts results to Database. If data of a student already exits, it gets updated on newest submit</marquee>
      <table className='addResults'>
        <tr>
          <th>Hall Ticket No.</th>
          <td><input type='text' placeholder='Enter Hall Ticket Number' value={results.regNo} name='regNo' onChange={(e)=>handleChange(e)} onBlur={()=>getName()} className='rounded md' maxLength={10}/></td>
        </tr>

        <tr>
          <th>
            Name
          </th>
          <td><input value={results.name} readOnly/></td>
        </tr>

        <tr>
          <th>Data Structures</th>
          <td><input type='text' placeholder='Enter DS Result' name='DS' value={results.DS} onChange={(e)=>handleChange(e)} className='rounded md' maxLength={2}/></td>
        </tr>

        <tr>
          <th>Computer Networks</th>
          <td><input type='text' placeholder='Enter CN Result' name='CN' value={results.CN} onChange={(e)=>handleChange(e)} className='rounded md' maxLength={2}/></td>
        </tr>

        <tr>
          <th>Operating Systems</th>
          <td><input type='text' placeholder='Enter OS Result' name='OS' value={results.OS} onChange={(e)=>handleChange(e)} className='rounded md' maxLength={2}/></td>
        </tr>

        <tr>
          <th>SGPA</th>
          <td><input type='number' placeholder='Enter SGPA' name='sgpa' onChange={(e)=>handleChange(e)} className='rounded md' max={10}/></td>
        </tr>

        <tr>
          <th>Pass/Fail</th>
          <td>
            <select name='pass' defaultValue={"Pass"} onChange={(e)=>handleChange(e)}>
              <option value={"Pass"}>Pass</option>
              <option value={"Fail"}>Fail</option>
            </select>
          </td>
        </tr>
      </table>

      <button onClick={()=>handleSubmit()} className='py-3 px-5 my-14 bg-orange-400 rounded-md'>Submit Result</button>

      <h1 className='text-lg'>{message[0].message}</h1>
    </div>
  )
}
export default AddResults;