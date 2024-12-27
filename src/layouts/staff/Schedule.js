import '../../styles/css/staff/schedule.css';

const Schedule = () => {

    const daysOfWeek = ["Mon, 23", "Tue, 24", "Wed, 25", "Thu, 26", "Fri, 27", "Sat, 28", "Sun, 29"];
    const timeSlots = [
        "7am", "8am", "9am", "10am", "11am", "12pm",
        "1pm", "2pm", "3pm", "4pm", "5pm", "6pm",
        "7pm", "8pm", "9pm", "10pm",
    ];

    return (
        <>
            <div className="container-staffschedule">
                <div className="calendar-container-staffschedule">
                    {/* Toolbar */}
                    <div className="toolbar-staffschedule">
                        <div className="navigation-staffschedule">
                            <button aria-label="Previous week">&lt;</button>
                            <button aria-label="Next week">&gt;</button>
                            <button aria-label="Today">Today</button>
                        </div>
                        <div className="date-range-staffschedule">02/12/2024 - 08/12/2024</div>
                        <div className="view-selector-staffschedule">
                            <button>Day</button>
                            <button className="active-staffschedule">Week</button>
                            <button>Month</button>
                        </div>
                    </div>

                    {/* Calendar */}
                    <table className="calendar-staffschedule" style={{ borderRadius: "0 0 8px 8px" }}>
                        <thead>
                            <tr>
                                <th className="time-column-staffschedule">All day</th>
                                {daysOfWeek.map((day, index) => (
                                    <th key={index} className="day-column-staffschedule">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {timeSlots.map((time, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="time-label-staffschedule">
                                        {time}
                                        <sup>{time.includes("am") ? "am" : "pm"}</sup>
                                    </td>
                                    {daysOfWeek.map((_, colIndex) => (
                                        <td key={`${rowIndex}-${colIndex}`}></td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Schedule;