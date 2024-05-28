import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";

const EditUserModal = ({ user, setShowEdit }) => {
    const { data, setData, reset } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
      
        setShowEdit(false); 
    };

    useEffect(() => {
        setData("name", user.name);
        setData("email", user.email);
        setData("role", user.role);
    }, [user]);

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select
                            value={data.role}
                            onChange={(e) => setData("role", e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
