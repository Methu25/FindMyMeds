package com.findmymeds.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        // 1. Public Endpoints (Authentication & Public Pharmacy Search)
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/v1/admin/auth/**").permitAll() // Keep your existing endpoint too
                        .requestMatchers(HttpMethod.GET, "/api/pharmacies/**").permitAll()

                        // 2. Super Admin Only Endpoints
                        .requestMatchers("/api/admin/dashboard/overview/super").hasRole("SUPER_ADMIN")
                        .requestMatchers("/api/admin/dashboard/charts/admins").hasRole("SUPER_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/admins/**").hasRole("SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/admins/**").hasRole("SUPER_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/admins/**").hasRole("SUPER_ADMIN")

                        // 3. Admin & Super Admin Endpoints
                        .requestMatchers("/api/admin/pharmacy-reports/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers("/api/admin/pharmacy-inventories/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers("/api/admin/pharmacies/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers("/api/admin/dashboard/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers("/api/admin-reports/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers("/api/admin/notifications/**").hasAnyRole("ADMIN", "SUPER_ADMIN")

                        // 4. Authenticated User Endpoints
                        .requestMatchers("/api/profile/**").authenticated()

                        // 5. All other requests must be authenticated
                        .anyRequest().authenticated()
                );

    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable() // disable CSRF for dev
                .authorizeRequests()
                .anyRequest().authenticated(); // or permitAll() if you want
    }

}
