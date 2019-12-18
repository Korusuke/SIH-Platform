import React from 'react'

import Profile from '../components/Profile';
import Bottomcardteam from '../components/bottomcardteam';
import Bottomcardjoin from '../components/bottomcardjoin';
import Bottomcardfirst from '../components/bottomcardfirst';
import Bottomcardconf from '../components/bottomcardconf';
export default function ProfileMember(){
    return(
        <div>
            < Profile />
            <Bottomcardteam />
            <Bottomcardjoin />
            <Bottomcardfirst />
            <Bottomcardconf />
        </div>
    );
}