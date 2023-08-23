import React from 'react';
import { Stats, useGetStatsQuery } from '../../graphql/generated/schema';
import OmLoading from '../../components/elements/OmLoading';
import OmAlert from '../../components/elements/OmAlert';
import { Container, Grid, IconButton } from '@mui/material';
import OmHeader from '../../components/elements/OmHeader';
import PersonIcon from '@mui/icons-material/Person';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StatsGrid from './StatsGrid';

export default function HomePage() {
    const { data: statsData, loading: statsLoading, error: statsError } = useGetStatsQuery();

    if (statsLoading) {
        return <OmLoading />
    }

    if (statsError || !statsData) {
        return <OmAlert message='Error retrieving stats data' />
    }

    const stats = statsData.stats as Stats;

    return (
        <Container>
            <Grid container spacing={3} alignItems='center'>
                <Grid item xs={12}>
                    <OmHeader header='Order Management App' />
                </Grid>
                <Grid item xs={4}>
                    <IconButton onClick={() => window.open('/customers')}>
                        <PersonIcon fontSize='large' color='secondary' /> Customers
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <IconButton onClick={() => window.open('/orders')}>
                        <FolderSharedIcon fontSize='large' color='secondary' /> Orders
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <IconButton onClick={() => window.open('/customers/newcustomer')}>
                        <AddCircleIcon fontSize='large' color='secondary' /> New Customer
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <StatsGrid stats={stats} />
                </Grid>
            </Grid>
        </Container>
    );
}