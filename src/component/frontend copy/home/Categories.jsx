import React from "react";

export default function Categories() {
  const data = [
    {
      title: "Women",
      desc: "Trendy collection",
      img: "/img/categories/category-1.jpg",
      large: true,
    },
    { title: "Men", items: "358", img: "/img/categories/category-2.jpg" },
    { title: "Kids", items: "273", img: "/img/categories/category-3.jpg" },
    { title: "Cosmetics", items: "159", img: "/img/categories/category-4.jpg" },
    { title: "Accessories", items: "792", img: "/img/categories/category-5.jpg" },
  ];

  return (
    <>
      <section className="cat">
        <div className="row m-0">

          {/* Left */}
          <div className="col-lg-6 p-1">
            {data.filter(d => d.large).map((item, i) => (
              <div
                key={i}
                className="card large"
                style={{ backgroundImage: `url(${item.img})` }}
              >
                <div className="overlay" />
                <div className="content">
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                  <span>Shop →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="col-lg-6 p-1">
            <div className="row m-0">
              {data.filter(d => !d.large).map((item, i) => (
                <div key={i} className="col-6 p-1">
                  <div
                    className="card"
                    style={{ backgroundImage: `url(${item.img})` }}
                  >
                    <div className="overlay" />
                    <div className="content small">
                      <h4>{item.title}</h4>
                      <p>{item.items} items</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <style>{`
        .cat {
          padding: 20px;
        }

        .card {
          position: relative;
          height: 180px;
          border-radius: 12px;
          background-size: cover;
          background-position: center;
          overflow: hidden;
          cursor: pointer;
          transition: 0.3s;
        }

        .card.large {
          height: 100%;
          min-height: 380px;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        }

        .content {
          position: absolute;
          bottom: 15px;
          left: 15px;
          color: #fff;
        }

        .content h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 700;
        }

        .content h4 {
          margin: 0;
          font-size: 16px;
        }

        .content p {
          font-size: 12px;
          opacity: 0.8;
        }

        .content span {
          font-size: 12px;
          font-weight: 600;
          opacity: 0.9;
        }

        .card:hover {
          transform: scale(1.04);
        }

        .card:hover .overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
        }

        @media(max-width:768px){
          .card.large{
            min-height:250px;
          }
        }
      `}</style>
    </>
  );
}