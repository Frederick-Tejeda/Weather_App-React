import { useState, useEffect } from 'react'

import { Nav, Navbar, Container, NavDropdown, Form } from 'react-bootstrap'
import { Switch, FormGroup, FormControlLabel, Stack, Typography } from '@mui/material'

import AntSwitch from '../mui/AntSwitch'

function Header(){

	const [tempC, setTempC] = useState(JSON.parse(localStorage.getItem('Temp')) || true);

	const HandleTempChange = (e) => {
		setTempC(e.target.checked);
		localStorage.setItem('Temp', e.target.checked)
	}

	return(
		<Navbar expand="lg" className="bg-body-tertiary" style={{borderBottom: "1px solid gray"}}>
			<Container>
				<Navbar.Brand>WeatherWeb</Navbar.Brand>
					<FormGroup>
						<Stack direction="row" spacing={1} alignItems="center">
				        <Typography>F</Typography>
				        <AntSwitch checked={tempC} onChange={HandleTempChange} inputProps={{ 'aria-label': 'ant design' }} />
				        <Typography>C</Typography>
				      </Stack>
					</FormGroup>
			</Container>
		</Navbar>
	)
}

export default Header