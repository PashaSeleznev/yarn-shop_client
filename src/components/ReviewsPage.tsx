import { reviewsArray } from "../reviews/reviews";

/*
Страница отзывов покупателей

Функционал:
- Отображает отзывы из статического массива reviewsArray
*/

const ReviewsPage = () => { 

  return (
    <div className="reviews-page">
      <img
        className="reviews-background"
        src="/background/reviews_background.png"
        alt="Фоновое изображение"
      />

      <div className="reviews-title">
        Отзывы покупателей
      </div>

      <ul className="reviews-list">
        {reviewsArray.map((review) => (
          <li key={review.id}>
            <div className="review-container">
              <img 
                className="customer-img"
                src={review.userImage}
                alt="Аватар пользователя" 
              />

              <div className="review-content">
                <div className="customer-name">{review.username}</div>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                      key={dot}
                      className={dot<=review.rating ? "dot-filled" : "dot-empty"}
                    />
                  ))}
                </div>
                <div className="review-text">{review.text}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsPage;