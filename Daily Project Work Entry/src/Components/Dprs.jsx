import React, { useContext, useEffect, useState } from 'react'
import TimePicker from 'react-time-picker';
import { useNavigate } from 'react-router-dom';
import noteContext from '../Context/notes/notecontext';

const Dprs = () => {
    let d = new Date().toString().split(' ')
    let Month = new Date().getMonth() + 1
    const Today = `${d[3]}-${Month < 10 ? `0${Month}` : Month}-${d[2]}`

    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { userdata, getMember, getProject, members, projects, user, createDPRS } = context;
    const [DPRS, setDPRS] = useState({ member: `${user}`, project: '', date: `${Today}`, dprsDescription: '' })
    const [workHour, setWorkHour] = useState('00:00');
    const [managementHour, setManagementHour] = useState('00:00');
    const [inTime, setInTime] = useState('10:00');
    const [outTime, setOutTime] = useState('19:00');
    const [select, setSelect] = useState('')
    const [moreComponet, setMoreComponet] = useState(false)

    const handleAddSubmit = (e) => {
        e.preventDefault();
        createDPRS(DPRS.member, DPRS.project, DPRS.date, workHour, managementHour, inTime, outTime, DPRS.dprsDescription)
        setDPRS({ member: { user }, project: '', date: `${Today}`, dprsDescription: '' })
        setWorkHour('00:00')
        setManagementHour('00:00')
        setWorkHour('00:00')
        setManagementHour('00:00')
        setMoreComponet(false)
        setSelect('')
    }

    const onchange = (e) => {
        setDPRS({ ...DPRS, [e.target.name]: e.target.value })
        setSelect({ ...DPRS, [e.target.name]: e.target.value }.member === '' ? user : { ...DPRS, [e.target.name]: e.target.value }.member)
        // console.log({ ...DPRS, [e.target.name]: e.target.value })
    }
    const clickForm = (e) => {
        userdata()
        if (!select) {
            setSelect(user)
            setDPRS({ ...DPRS, member: user })
        }
    }
    const toggle = () => {
        setMoreComponet(!moreComponet)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getProject()
            getMember()
            userdata()
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="topbar  p-2 m-2 mt-1" style={{ backgroundColor: 'white', color: '#a40df1', fontFamily: 'emoji', borderBottom: '0.5px solid #c1bebe' }}>
                DPRS ENTRY
            </div>
            <div className="mx-2 px-3 " style={{ backgroundColor: 'white', border: '0.2px solid #c1bebe' }}>
                <form onSubmit={handleAddSubmit} encType="multipart/form-data" onClick={clickForm}>
                    <div className='m-4   row'>
                        <div className="my-2 mx-0 AddMember-mobile-style">
                            <div className='fs-6 fw-light '>Member Name *</div>
                            <select className="bottom-border " aria-label="filterTrackingStatus" value={DPRS.member} onChange={onchange} name="member">
                                <option value={user}>{user}</option>
                                {members.map((member) => { return `${member.firstName} ${member.lastName}` !== user && <option key={member._id} value={`${member.firstName} ${member.lastName}`} > {member.firstName} {member.lastName}</option> })}
                            </select>
                        </div>
                        <div className="my-2 AddMember-mobile-style">
                            <div className='fs-6 fw-light '>Select Project</div>
                            <select className="bottom-border" aria-label="filterProjectStatus" value={DPRS.project} onChange={onchange}  name="project" required>
                                <option value=''></option>
                                {projects.map((project, index) => { return (project.member.split(', ').some(pMember => pMember === `${select}`) === true ? projects[index] : null) }).filter((project) => { return project !== null }).map((project) => { return <option key={project._id} value={project.projectName} >{project.projectName}</option> })}
                            </select>
                        </div>
                        <div className="row mt-3 row-cols-3">
                            <div className="d-flex pt-1 flex-column ">
                                <div className='fs-6'>Work Date</div>
                                <input type="date" className='bottom-border pt-1' value={DPRS.date} onChange={onchange} name="date" required />
                            </div>
                            <div className="d-flex pt-1 flex-column ">
                                <div className='fs-6'>Work Hours</div>
                                <TimePicker clockIcon={null} value={workHour} onChange={setWorkHour} />
                            </div>
                            <div className="d-flex pt-1 flex-column ">
                                <div className='fs-6'>Management Support Hours</div>
                                <TimePicker clockIcon={null} value={managementHour} onChange={setManagementHour} required />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="form-group ">
                                <div className='fs-6 py-2'>Enter Task Description</div>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" name='dprsDescription' value={DPRS.dprsDescription} onChange={onchange} placeholder='Enter Task Description' required></textarea>
                            </div>
                        </div>
                        <div className={moreComponet ? 'mt-2' : 'mt-2 d-none'}>
                            <div className="row row-cols-2 ">
                                <div className="d-flex pt-1 flex-column ">
                                    <div className='fs-6'>In Time</div>
                                    <TimePicker clockIcon={null} value={inTime} onChange={setInTime} />
                                </div>
                                <div className="d-flex pt-1  flex-column ">
                                    <div className='fs-6'>Out Time</div>
                                    <TimePicker clockIcon={null} value={outTime} onChange={setOutTime} />
                                </div>
                            </div>
                        </div>
                        <div className="my-4">
                            <div className="container mx-2 p-1 AddMember-mobile-style">
                                <button type="submit" className="btn btn-primary btn-outline-light px-4 mx-1 py-1 fw-bold border border-dark text-center" style={{ width: '90px' }}>Save</button>
                                <button type='button' className="btn btn-light btn-outline-primary mx-4 py-1 fw-bold " style={{ width: '90px' }} onClick={toggle} >{moreComponet ? 'Less' : 'More'}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </>
    )
}

export default Dprs
