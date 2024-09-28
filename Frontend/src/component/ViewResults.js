import React, {useState} from 'react'

function ViewResults() {
  const [regNo, setRegNo] = useState('');
  const [results, setResults] = useState(null);

  const getResult = () => {
    fetch('http://localhost:5555/getResults/'+regNo,{
      method:"GET"
    }).then((res)=>res.json()).then((data)=>{
      if(data['message']){
        setResults(null);
      }
      else {
        setResults(data);
        console.log(data);
      }
    })
    .catch((error)=>console.log(error));
  }

  const handleClick = (e) => {
    if(e.key==="Enter"){
      getResult();
    }
  }

  const failOrPass = (s) => {
    return s==='F'?0:3;
  }

  return (
    <div onKeyDown={(e)=>handleClick(e)}>
      <h1 className="text-center text-2xl p-1">View Results</h1><br></br>

      <div align='center' className='justify-evenly'>
        <input type='text' placeholder='Enter Hall Ticket No.' value={regNo} className='px-8 p-3 mr-7 rounded-md' onChange={(e) =>setRegNo((e.target).value.toUpperCase())}/>
        <button className='bg-orange-400 px-5 py-2 m-3 text-white hover:bg-orange-700 rounded-md' onClick={()=>getResult()}>Get Result</button>
      </div>

      {Boolean(results)?
      (
        <table align='center' className='resultsTable'>
          <tr>
            <td colSpan={2}> Hall Ticket No.</td>
            <td colSpan={2}>{results.regNo}</td>
          </tr>
          <tr>
            <td colSpan={2}>Name</td>
            <td colSpan={2}>{results.name}</td>
          </tr>
        <tr>
          <th>S.No</th>
          <th> Subject </th>
          <th> Grades </th>
          <th> Credits </th>
        </tr>

        <tr>
          <td>1</td>
          <td>Data Structures</td>
          <td>{results.DS}</td>
          <td>{failOrPass(results.DS)}</td>
        </tr>

        <tr>
          <td>2</td>
          <td>Computer Networks</td>
          <td>{results.CN}</td>
          <td>{failOrPass(results.CN)}</td>
        </tr>

        <tr>
          <td>3</td>
          <td>Operating Systems</td>
          <td>{results.OS}</td>
          <td>{failOrPass(results.OS)}</td>
        </tr>

        <tr>
          <td colSpan={2}>Pass/Fail</td>
          <td colSpan={2}>{results.pass}</td>
        </tr>

        <tr>
          <td colSpan={2}>SGPA</td>
          <td colSpan={2}>{results.sgpa}</td>
        </tr>

        <tr>
          <td colSpan={4}><button onClick={()=>window.print()} className='font-light p-3 bg-orange-300 rounded-md'>Download/Print Result</button></td>
        </tr>
      </table>
      ):(
        <div className='bg-black text-white text-center mt-10 py-5'>
          <h1>Enter Valid Hall Ticket Number</h1>
        </div>
      )}
    </div>
  )
}

export default ViewResults