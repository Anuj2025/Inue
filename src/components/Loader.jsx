export default function Loader() {
  return (
    <>
<div className="m-1 flex w-full flex-col gap-4">
  <div className="skeleton h-32 w-1/2"></div>
  <div className="skeleton h-4 w-full">
  </div>
  <div className="skeleton h-4 w-1/2"></div>
  <div className="skeleton h-4 w-full"></div>
</div>


<div className="m-2 flex w-full flex-col gap-4">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-3/6">
  </div>
  <div className="skeleton h-4 w-1/2"></div>
  <div className="skeleton h-4 w-full"></div>
</div>

<div className="m-2 flex w-full flex-col gap-4">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-full">
  </div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>
    </>
    )
}