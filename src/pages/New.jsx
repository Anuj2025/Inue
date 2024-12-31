

export default function New() {
  return (
    <>
    <div className="_New menu bg-base-200  bg-base-100 W-full min-h-80 shadow-md">
    <div className="mt-2.5 input">
      <input className="w-full h-full"type="text" placeholder="Project Name"/>
    </div>

   <div className="mt-2.5 input">
      <input className="w-full h-full"type="text" placeholder="Discription"/>
    </div>
    
   <div className="mt-2.5 input">
      <input className="w-full h-full"type="text" placeholder="Your Name"/>
      
    </div>
    
<div className="input mt-2.5 w-full">
  <select className="select w-full max-w-xs">
  <option disabled selected>Select Theme</option>
  <option>Game of Thrones</option>
  <option>Lost</option>
  <option>Breaking Bad</option>
  <option>Walking Dead</option>
</select>

</div>

<button className="btn mt-10 btn-active btn-primary">Start</button>
</div>

    </>
    );
}