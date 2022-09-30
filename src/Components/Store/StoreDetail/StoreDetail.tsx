import { RootState } from "configStore";
import { useSelector } from "react-redux";

const StoreDetail = () => {
  const { storesDetail } = useSelector((state: RootState) => state.storeSlice);

  console.log(storesDetail);

  if (storesDetail?.name) {
    return (
      <div>
        <h1 className="text-center text-4xl text-red-500">
          {storesDetail?.name}
        </h1>
        <div className="container mx-auto p-5">
          <div className="grid md:grid-cols-2 grid-cols-1">
            <div>
              <p>Địa chỉ: {!storesDetail?.address.name}</p>
              <p>Quận: {storesDetail?.address.district}</p>
              <p>TỈnh/Thành Phố: {storesDetail?.address.province}</p>
              <p>Email: {storesDetail?.email}</p>
              <p>Số điện thoại: {storesDetail?.phone}</p>
            </div>
            <div>
              <iframe
                src={storesDetail.idMap}
                className="w-96 h-96 rounded-lg"
                title="map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>something wrong...</div>;
  }
};

export default StoreDetail;
