import '../../styles/css/staff/message.css';

const Message = () => {

    const messages = [
        {
            id: 1,
            sender: 'Admin',
            content: 'Thông báo về việc lãnh lương cho Staff 1',
            imageUrl: 'https://storage.googleapis.com/a1aa/image/Czsta11ewW1zT6Yrf0Aujr922IClz3X6oijxJlNTTd9yeAlnA.jpg',
        },
        {
            id: 2,
            sender: 'Admin',
            content: 'Thông báo về việc lãnh lương cho Staff 1',
            imageUrl: 'https://storage.googleapis.com/a1aa/image/Czsta11ewW1zT6Yrf0Aujr922IClz3X6oijxJlNTTd9yeAlnA.jpg',
        },
        {
            id: 3,
            sender: 'Admin',
            content: 'Thông báo về việc lãnh lương cho Staff 1',
            imageUrl: 'https://storage.googleapis.com/a1aa/image/Czsta11ewW1zT6Yrf0Aujr922IClz3X6oijxJlNTTd9yeAlnA.jpg',
        },
    ];

    const handleViewMore = () => {
        alert('Hiển thị thêm tin nhắn!');
    };

    const handleExit = () => {
        alert('Thoát tin nhắn!');
    };

    return (
        <div className="messages-staffmessages" style={{marginRight: '100px', marginTop: '100px', maxWidth: '960px' }}>
            <h2>
                <i className="fas fa-envelope"></i> Tin Nhắn
            </h2>
            {messages.map((message) => (
                <div key={message.id} className="message-item-staffmessages">
                    <img
                        src={message.imageUrl}
                        alt={message.sender}
                        width="50"
                        height="50"
                    />
                    <div className="message-content-staffmessages">
                        <strong>{message.sender}</strong>
                        <p>{message.content}</p>
                    </div>
                    <div className="message-actions-staffmessages">
                        <i className="fas fa-phone"></i>
                        <i className="fas fa-video"></i>
                    </div>
                </div>
            ))}
            <div className="button-container-staffmessages">
                <button className="btn-staffmessages btn-primary-staffmessages" onClick={handleViewMore}>
                    <i className=""></i> Xem thêm
                </button>
                <button className="btn-staffmessages btn-secondary-staffmessages" onClick={handleExit}>
                    <i className=""></i> Thoát
                </button>
            </div>
        </div>
    );
};

export default Message;