
export const VisibilityControl= props =>{
    return(
        <div className="form-check">
            <input 
            type="checkbox"
            className="form-check-input"
            checked={props.isChecked}
            onChange={e=> props.callback(e.target.checked)}
            />
            <label htmlFor="for-check-label">
                show {props.description}
            </label>
        </div>
    )
}