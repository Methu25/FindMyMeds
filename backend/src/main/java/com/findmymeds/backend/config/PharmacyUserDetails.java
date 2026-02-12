package com.findmymeds.backend.config;

import com.findmymeds.backend.model.Pharmacy;
import com.findmymeds.backend.model.enums.PharmacyStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@RequiredArgsConstructor
public class PharmacyUserDetails implements UserDetails {

    private final Pharmacy pharmacy;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_PHARMACY"));
    }

    @Override
    public String getPassword() {
        return pharmacy.getPassword();
    }

    @Override
    public String getUsername() {
        return pharmacy.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return pharmacy.getStatus() != PharmacyStatus.SUSPENDED && pharmacy.getStatus() != PharmacyStatus.REJECTED;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return pharmacy.getStatus() == PharmacyStatus.ACTIVE || pharmacy.getStatus() == PharmacyStatus.PENDING;
    }

    public Pharmacy getPharmacy() {
        return pharmacy;
    }
}
