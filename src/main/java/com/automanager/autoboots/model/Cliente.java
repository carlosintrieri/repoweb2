package com.automanager.autoboots.model;

import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Cliente extends RepresentationModel<Cliente> {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    private String nomeSocial;
    
    @Temporal(TemporalType.DATE)
    private Date dataNascimento;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataCadastro;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "cliente_id")
    private List<Documento> documentos = new ArrayList<>();
    
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Endereco endereco;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "cliente_id")
    private List<Telefone> telefones = new ArrayList<>();
    
    public Cliente() {
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public String getNomeSocial() {
        return nomeSocial;
    }
    
    public void setNomeSocial(String nomeSocial) {
        this.nomeSocial = nomeSocial;
    }
    
    public Date getDataNascimento() {
        return dataNascimento;
    }
    
    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
    
    public Date getDataCadastro() {
        return dataCadastro;
    }
    
    public void setDataCadastro(Date dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
    
    public List<Documento> getDocumentos() {
        return documentos;
    }
    
    public void setDocumentos(List<Documento> documentos) {
        this.documentos = documentos;
    }
    
    public Endereco getEndereco() {
        return endereco;
    }
    
    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }
    
    public List<Telefone> getTelefones() {
        return telefones;
    }
    
    public void setTelefones(List<Telefone> telefones) {
        this.telefones = telefones;
    }
}
