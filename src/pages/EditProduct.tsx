import { useParams } from "react-router-dom"
import EditAndAdd from "../components/EditAndAdd"

const EditProduct = () => {
  const params = useParams()
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <EditAndAdd id={params.id} />
    </div>
  )
}

export default EditProduct
