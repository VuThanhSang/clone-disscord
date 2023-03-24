import { Avatar, Box, Button, InputBase, styled } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createServer, getListServer } from '~/features/server/serverSlice';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '400px',
    backgroundColor: '#E3E5E8',
    borderRadius: '5px',
    marginBottom: 10,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 1),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '53ch',
        },
    },
}));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 445,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
function CreateServer({ params, callback }) {
    const { currentUser, loading } = useSelector((state) => state.auth);
    const [serverName, setServerName] = useState('');
    const dispatch = useDispatch();
    const createServerHandle = () => {
        dispatch(createServer(serverName));
        dispatch(getListServer());
        callback();
    };
    return (
        <Box sx={{ ...style }}>
            <div style={{ textAlign: 'center' }}>
                <h5 id="child-modal-title">Customize your server</h5>
                <p style={{ fontSize: 13 }} id="child-modal-description">
                    Give your new server a personality with a name and an icon. You can alway change it latter
                </p>
            </div>
            <Avatar
                sx={{
                    width: 100,
                    height: 100,
                    margin: 'auto',
                    marginTop: 5,
                    marginBottom: 5,
                    cursor: 'pointer',
                }}
                src="https://th.bing.com/th/id/OIP.wT4AX6e5ZnbfCd8SsZ1yYAAAAA?pid=ImgDet&w=300&h=300&rs=1"
            ></Avatar>
            <h6>Customize your server</h6>
            <StyledInputBase
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="Message #Chung"
                inputProps={{ 'aria-label': 'search' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p onClick={callback} style={{ fontSize: 12, cursor: 'pointer' }}>
                    Back
                </p>
                <Button onClick={createServerHandle} variant="contained">
                    Create
                </Button>
            </div>
        </Box>
    );
}
export default CreateServer;
