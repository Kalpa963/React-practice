const students = [
    { id: 1, name: "Rahul", age: 17 },
    { id: 2, name: "Priya", age: 16 },
    { id: 3, name: "Aman", age: 17 },
];

const StudentList = () => {
    return (
        <div>
            <h2>Students</h2>

            {students.map((student) => (
                <div key={student.id}>
                    <h3>{student.name}</h3>
                    <p>Age: {student.age}</p>
                </div>
            ))}
        </div>
    );
};

export default StudentList;