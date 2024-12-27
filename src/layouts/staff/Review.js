import '../../styles/css/staff/review.css';

const Review = () => {

    const feedbacks = [
        {
            id: 1,
            avatar: "../assets/picture/client.svg",
            name: "Nguyễn Văn A",
            date: "20/11/2023",
            rating: 4.0,
            review: "Dịch vụ rất tốt, nhân viên nhiệt tình, tôi rất hài lòng với kiểu tóc mới!",
        },
        {
            id: 2,
            avatar: "../assets/picture/client.svg",
            name: "Trần Thị B",
            date: "15/11/2023",
            rating: 5.0,
            review: "Tuyệt vời! Kiểu tóc Undercut rất phù hợp với tôi. Chắc chắn sẽ quay lại!",
        },
        {
            id: 3,
            avatar: "../assets/picture/client.svg",
            name: "Lê Văn C",
            date: "22/11/2023",
            rating: 4.5,
            review: "Màu tóc đẹp, dịch vụ gội đầu rất thoải mái. Sẽ giới thiệu cho bạn bè!",
        },
        {
            id: 4,
            avatar: "../assets/picture/client.svg",
            name: "Phạm Thị D",
            date: "23/11/2023",
            rating: 5.0,
            review: "Tóc uốn đẹp tự nhiên, nhân viên tư vấn rất nhiệt tình và chuyên nghiệp!",
        },
        {
            id: 5,
            avatar: "../assets/picture/client.svg",
            name: "Hoàng Văn E",
            date: "23/11/2023",
            rating: 4.0,
            review: "Màu nhuộm rất ưng ý, tóc mềm mượt sau khi phục hồi. Cảm ơn salon!",
        },
    ];

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <i key={`full-${i}`} className="fas fa-star"></i>
                ))}
                {halfStar && <i className="fas fa-star-half-alt"></i>}
                {[...Array(emptyStars)].map((_, i) => (
                    <i key={`empty-${i}`} className="far fa-star"></i>
                ))}
            </>
        );
    };

    return (
        <div className="feedbacks-list-reviewsandfeedback">
            <h2 className="feedbacks-title-reviewsandfeedback">
                <i className="far fa-star"></i> Đánh giá và phản hồi
            </h2>

            {feedbacks.map((feedback) => (
                <div
                    key={feedback.id}
                    className="feedback-item-reviewsandfeedback"
                >
                    <img
                        src={feedback.avatar}
                        alt="Avatar"
                        className="customer-avatar-reviewsandfeedback"
                    />
                    <div className="review-details-reviewsandfeedback">
                        <div className="review-left-reviewsandfeedback">
                            <div className="customer-info-reviewsandfeedback">
                                <strong className="customer-name-reviewsandfeedback">
                                    {feedback.name}
                                </strong>
                                <div className="review-date-reviewsandfeedback">
                                    {feedback.date}
                                </div>
                            </div>
                            <div className="rating-reviewsandfeedback">
                                {renderStars(feedback.rating)}
                                <span className="rating-number-reviewsandfeedback">
                                    {feedback.rating.toFixed(1)}/5.0
                                </span>
                            </div>
                            <p className="review-text-reviewsandfeedback">
                                {feedback.review}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Review;