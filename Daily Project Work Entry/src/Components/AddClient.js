import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/notecontext';


const AddClient = () => {
    const context = useContext(noteContext);
    const { createClient, getClient, client } = context;
    const [mode, setMode] = useState(true)
    const [clients, setClients] = useState({ clientName: '', country: '', clientCode: '' })
    const refClient = useRef(null)


    const handleClient = (e) => {
        e.preventDefault();
        createClient(clients.clientName, clients.country, (ClientNumber < 10 ? `C00${ClientNumber}` : ClientNumber < 100 ? `C0${ClientNumber}` : `C${ClientNumber}`), mode)
        setClients({ clientName: '', country: '' })
        setMode(true)
        refClient.current.click()
    }
    const onChanges = (e) => {
        setClients({ ...clients, [e.target.name]: e.target.value })
    }

    const toggleMode = () => {
        if (mode === true) {
            setMode(false)
        }
        else {
            setMode(true)
        }
    }

    useEffect(() => {
        getClient()
        // eslint-disable-next-line
    }, [])

    let ClientNumber = (client[client.length - 1] ? parseInt(client[client.length - 1].code.slice(1)) : 0) + 1

    return (
        <>
            {/* <!-- Modal --> */}
            <div className="modal fade" ref={refClient} id="createClient" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add New Client</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body ">
                            <>
                                <form onSubmit={handleClient}>
                                    <div className="container m-auto">
                                        <div className=" AddMember-mobile-style" style={{ display: 'inline-flex' }}>
                                            <label className='' style={{ fontSize: '14px', width: '100%' }}>Client Code</label>
                                            <input type="text " disabled className='bottom-border' style={{ fontSize: '14px' }} value={ClientNumber < 10 ? `C00${ClientNumber}` : ClientNumber < 100 ? `C0${ClientNumber}` : `C${ClientNumber}`} />

                                        </div>
                                        <div className="mt-4 AddMember-mobile-style ">
                                            <input type="text " className='bottom-border' placeholder="Client Name *" value={clients.clientName} onChange={onChanges} name="clientName" minLength={2} maxLength={25} required />
                                        </div>
                                        <div className="mt-4 AddMember-mobile-style">
                                            <input type="text " className='bottom-border' placeholder="Country" value={clients.country} onChange={onChanges} name="country" minLength={2} maxLength={25} required />
                                        </div>
                                        <div className="form-check form-switch mt-3 AddMember-mobile-style">
                                            <input className="form-check-input border border-dark " type="checkbox" role="switch" checked={mode === true ? true : false} onChange={toggleMode} name="isActive" />
                                            <label className="form-check-label  " htmlFor="flexSwitchCheckChecked">Is Active?</label>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-success" ref={refClient}>ADD Client</button>
                                    </div>
                                </form>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddClient
