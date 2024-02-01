
export function Header({ title, subtitle }) {
    return (
        <div className='mt-5 mb-2 mx-auto'>
            <h2 className='font-black text-3xl'>{title}</h2>
            <small>{subtitle}</small>
        </div>
    );
}