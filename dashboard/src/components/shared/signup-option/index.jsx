// eslint-disable-next-line react/prop-types
const SignupOption = ({ bgColor, Icon }) => {
    // eslint-disable-next-line react/prop-types
    const colorName = bgColor.split("-")[1]
    return (
        <div className={`w-[35px] h-[35px] flex rounded-md shadow-lg hover:shadow-${colorName}-700/50 justify-center cursor-pointer items-center overflow-hidden ${bgColor} `}>
            <span> <Icon /> </span>
        </div>
    )
}

export default SignupOption