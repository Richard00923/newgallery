import {useEffect, useState} from "react";
import "./container.css"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
const ACCESS_KEY = 'ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9';
const GalleryScreen = () => {
    const [date, setDate] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        fetch(`https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&&page=${page}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDate(data);
            })
    }, [page])
    const [bigImg, setBigImg] = useState({img: '', i: 0})
    const viewImage = (img, i) => {
        setBigImg({img, i})
    }
    const imgAction = (action) => {
        let i = bigImg.i;

        if (action === 'next-img') {
            if (i < 9) {
                setBigImg({img: date[i + 1].urls.full, i: i + 1});
            } else {
                setBigImg({img: date[0].urls.full, i: 0});
            }
        } else if (action === 'prev-img') {
            if (i > 0) {
                setBigImg({img: date[i - 1].urls.full, i: i - 1});
            } else {
                setBigImg({img: date[9].urls.full, i: 9});
            }
        } else {
            setBigImg({img: '', i: 0});
        }
    }
    return (
        <>
            {bigImg.img &&
                <div className="bigDiv" style={{backgroundImage:`${date[0].links.download}`}}>
                    <button className="buttonX" onClick={() => imgAction()}>x</button>
                    <button className="buttonPrevious" onClick={() => imgAction('prev-img')}>Previous</button>
                    <img src={bigImg.img} alt={date[bigImg.i].alt_description} className="bigImg"/>
                    <button className="buttonNext" onClick={() => imgAction('next-img')}>Next</button>
                </div>}
            <div className="container">
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                    <Masonry gutter="20px">
                        {date.map((item, key) => {
                            return (
                                <div className="picContainer" key={key}>
                                    <img className="pics"
                                         src={item.urls.small}
                                         alt={item.alt_description}
                                         onClick={() => viewImage(item.links.download, key)}
                                    />
                                    <div className="picOverlay">
                                        <p className="picture-description">{item.alt_description}</p>
                                        <p className="picAuthor">{item.user.first_name}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
            <div className="buttonContainer">
                <button className="previousPageBelow" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous Page</button>
                <button className="nextPageBelow" onClick={() => setPage(page + 1)}>Next Page</button>
            </div>
        </>
    )

}

export default GalleryScreen;